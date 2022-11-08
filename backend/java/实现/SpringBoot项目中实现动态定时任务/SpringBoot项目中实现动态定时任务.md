## SpringBoot项目中实现动态定时任务

记录如何在SpringBoot项目中实现动态定时任务。

因为只是一个demo，所以只引入了需要的依赖：

```
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-log4j2</artifactId>
        <optional>true</optional>
    </dependency>

    <!-- spring boot 2.3版本后，如果需要使用校验，需手动导入validation包-->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>

    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>
</dependencies>
```

启动类：

```
package com.wl.demo;
 
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
 
/**
 * @author wl
 */
@EnableScheduling
@SpringBootApplication
public class DemoApplication {
 
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
        System.out.println("(*^▽^*)启动成功!!!(〃'▽'〃)");
    }
}
```

配置文件application.yml，只定义了服务端口：

```
server:
  port: 8089
```

定时任务执行时间配置文件：task-config.ini:

```
printTime.cron=0/10 * * * * ?
```

定时任务执行类：

```
package com.wl.demo.task;
 
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.scheduling.Trigger;
import org.springframework.scheduling.TriggerContext;
import org.springframework.scheduling.annotation.SchedulingConfigurer;
import org.springframework.scheduling.config.ScheduledTaskRegistrar;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.stereotype.Component;
 
import java.time.LocalDateTime;
import java.util.Date;
 
/**
 * 定时任务
 * @author wl
 */
@Data
@Slf4j
@Component
@PropertySource("classpath:/task-config.ini")
public class ScheduleTask implements SchedulingConfigurer {
 
    @Value("${printTime.cron}")
    private String cron;
 
    @Override
    public void configureTasks(ScheduledTaskRegistrar taskRegistrar) {
        // 动态使用cron表达式设置循环间隔
        taskRegistrar.addTriggerTask(new Runnable() {
            @Override
            public void run() {
                log.info("Current time： {}", LocalDateTime.now());
            }
        }, new Trigger() {
            @Override
            public Date nextExecutionTime(TriggerContext triggerContext) {
                // 使用CronTrigger触发器，可动态修改cron表达式来操作循环规则
                CronTrigger cronTrigger = new CronTrigger(cron);
                Date nextExecutionTime = cronTrigger.nextExecutionTime(triggerContext);
                return nextExecutionTime;
            }
        });
    }
}
```

编写一个接口，使得可以通过调用接口动态修改该定时任务的执行时间：

```
牛逼啊！接私活必备的 N 个开源项目！赶快收藏
package com.wl.demo.controller;
 
import com.wl.demo.task.ScheduleTask;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
 
/**
 * @author wl
 */
@Slf4j
@RestController
@RequestMapping("/test")
public class TestController {
 
    private final ScheduleTask scheduleTask;
 
    @Autowired
    public TestController(ScheduleTask scheduleTask) {
        this.scheduleTask = scheduleTask;
    }
 
    @GetMapping("/updateCron")
    public String updateCron(String cron) {
        log.info("new cron :{}", cron);
        scheduleTask.setCron(cron);
        return "ok";
    }
}
```

启动项目，可以看到任务每10秒执行一次：

![1](.\images\1.jpg)

访问接口，传入请求参数cron表达式，将定时任务修改为15秒执行一次：

![2](.\images\2.png)

可以看到任务变成了15秒执行一次

![3](.\images\3.png)

除了上面的借助cron表达式的方法，还有另一种触发器，区别于CronTrigger触发器，该触发器可随意设置循环间隔时间，不像cron表达式只能定义小于等于间隔59秒。

```
package com.wl.demo.task;
 
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.scheduling.Trigger;
import org.springframework.scheduling.TriggerContext;
import org.springframework.scheduling.annotation.SchedulingConfigurer;
import org.springframework.scheduling.config.ScheduledTaskRegistrar;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.scheduling.support.PeriodicTrigger;
import org.springframework.stereotype.Component;
 
import java.time.LocalDateTime;
import java.util.Date;
 
/**
 * 定时任务
 * @author wl
 */
@Data
@Slf4j
@Component
@PropertySource("classpath:/task-config.ini")
public class ScheduleTask implements SchedulingConfigurer {
 
    @Value("${printTime.cron}")
    private String cron;
 
    private Long timer = 10000L;
 
    @Override
    public void configureTasks(ScheduledTaskRegistrar taskRegistrar) {
        // 动态使用cron表达式设置循环间隔
        taskRegistrar.addTriggerTask(new Runnable() {
            @Override
            public void run() {
                log.info("Current time： {}", LocalDateTime.now());
            }
        }, new Trigger() {
            @Override
            public Date nextExecutionTime(TriggerContext triggerContext) {
                // 使用CronTrigger触发器，可动态修改cron表达式来操作循环规则
//                CronTrigger cronTrigger = new CronTrigger(cron);
//                Date nextExecutionTime = cronTrigger.nextExecutionTime(triggerContext);
 
                // 使用不同的触发器，为设置循环时间的关键，区别于CronTrigger触发器，该触发器可随意设置循环间隔时间，单位为毫秒
                PeriodicTrigger periodicTrigger = new PeriodicTrigger(timer);
                Date nextExecutionTime = periodicTrigger.nextExecutionTime(triggerContext);
                return nextExecutionTime;
            }
        });
    }
}
```

增加一个修改时间的接口：

```
package com.wl.demo.controller;
 
import com.wl.demo.task.ScheduleTask;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
 
/**
 * @author wl
 */
@Slf4j
@RestController
@RequestMapping("/test")
public class TestController {
 
    private final ScheduleTask scheduleTask;
 
    @Autowired
    public TestController(ScheduleTask scheduleTask) {
        this.scheduleTask = scheduleTask;
    }
 
    @GetMapping("/updateCron")
    public String updateCron(String cron) {
        log.info("new cron :{}", cron);
        scheduleTask.setCron(cron);
        return "ok";
    }
 
    @GetMapping("/updateTimer")
    public String updateTimer(Long timer) {
        log.info("new timer :{}", timer);
        scheduleTask.setTimer(timer);
        return "ok";
    }
}
```

测试结果：

![4](.\images\4.jpg)