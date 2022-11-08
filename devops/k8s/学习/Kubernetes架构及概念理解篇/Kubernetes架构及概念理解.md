

# Kubernetes架构及概念理解篇



## 一、Kubernetes介绍

Kubernetes（k8s）最初源于谷歌内部的Borg（Borg是谷歌内部的大规模集群管理系统，负责对谷歌内部很[多核](https://so.csdn.net/so/search?q=多核&spm=1001.2101.3001.7020)心服务的调度和管理），是一个轻便的和可扩展的开源平台，提供了**面向应用**的容器集群部署和管理系统，用于管理容器化应用和服务，进行应用的自动化部署和扩缩容，Kubernetes(k8s)是一个自动化容器操作的开源平台。Kubernetes 的目标旨在：消除编排物理/虚拟计算，网络和存储基础设施的负担，并使应用程序运营商和开发人员完全将重点放在以容器为中心的原语上进行自助运营。Kubernetes 也提供稳定、兼容的基础（平台），用于构建定制化的workflows 和更高级的自动化任务。Kubernetes中，组成应用的容器会组合成一个逻辑单元，以更易管理和发现。Kubernetes积累了其作为Google生产环境运行工作负载多年的经验和一些最佳的社区建议和实践总结。

Kubernetes 具备完善的集群管理能力，包括多层次的安全防护和准入机制、多租户应用支撑能力、透明的服务注册和服务发现机制、内建负载均衡器、故障发现和自我修复能力、服务滚动升级和在线扩容、可扩展的资源自动调度机制、多粒度的资源配额管理能力。

Kubernetes 还提供完善的管理工具，涵盖开发、部署测试、运维监控等各个环节。首先我们来看下google Born项目的[架构](https://so.csdn.net/so/search?q=架构&spm=1001.2101.3001.7020)：
![1](.\images\1.png)
如上图所示，Google Borg主要由BorgMaster、Borglet、borgcfg和Scheduler组成，其中：

a) BorgMaster是整个集群的大脑，负责维护整个集群的状态，并将数据持久化到Paxos存储中；

b) Scheduer负责任务的调度，根据应用的特点将其调度到具体的机器上去；

c) Borglet负责真正运行任务（在容器中）；

d) borgcfg是Borg的**命令行工具**，用于跟Borg系统交互，一般通过**一个配置文件**来提交任务。

**Kubernetes的关键特性包括：**

**自动化装箱：** 在不牺牲可用性的条件下，基于容器对资源的要求和约束**自动部署容器**。同时，为了提高利用率和节省更多资源，将关键和最佳工作量结合在一起。

**自愈能力：** 当容器失败时，会对容器进行重启；当所部署的Node节点有问题时，会对容器进行重新部署和重新调度；当容器未通过监控检查时，会关闭此容器；直到容器正常运行时，才会对外提供服务。

**水平扩容：** 通过简单的命令、用户界面或基于CPU的使用情况，能够对应用进行扩容和缩容。

**服务发现和负载均衡**：开发者不需要使用额外的服务发现机制，就能够基于Kubernetes进行服务发现和负载均衡。

**自动发布和回滚：** Kubernetes能够程序化的发布应用和相关的配置。如果发布有问题，Kubernetes将能够回滚发生的变更。

**保密和配置管理**：在不需要重新构建镜像的情况下，可以部署和更新保密和应用配置。

**存储编排：** 自动挂接存储系统，这些存储系统可以来自于本地、公共云提供商（例如：GCP和AWS）、网络存储(例如：NFS、iSCSI、Gluster、Ceph、Cinder和Floker等)。

## 二、Kubernetes架构

Kubernetes借鉴了Borg的设计理念，比如Pod、Service、Labels和单Pod单IP等。Kubernetes的整体架构跟Borg非常像，如下图所示：

![1](.\images\2.png)
![1](.\images\3.png)

![1](.\images\4.png)
![1](.\images\5.png)

Kubernetes属于**主从分布式架构**，主要由Master Node和Worker Node组成，以及包括客户端命令行工具kubectl和其它附加项。

**Master Node：** 作为**控制节点**，对集群进行**调度管理**；Master Node由API Server、Scheduler、Cluster State Store（etcd）和Controller Manger Server所组成；

```
etcd：保存了整个集群的状态；
apiserver ：提供了**资源操作**的**唯一入口**，并提供认证、授权、访问控制、API注册和发现等机制；
controller manager：负责维护集群的状态，比如故障检测、自动扩展、滚动更新等；
scheduler：负责资源的调度，按照预定的调度策略将Pod调度到相应的机器上；
1234
```

**Worker Node：** 作为真正的工作节点，**运行**业务应用的**容器**；Worker Node包含kubelet、kube proxy和Container Runtime；

```
kubelet*：负责维护容器的生命周期，同时也负责Volume（CVI）和网络（CNI）的管理；
Container runtime：负责镜像管理以及Pod和容器的真正运行（CRI）；
kube-proxy：负责为Service提供cluster内部的服务发现和负载均衡；
123
```

![1](.\images\6.png)

**kubectl：** 用于通过命令行与API Server进行交互，而对Kubernetes进行操作，实现在集群中进行各种资源的增删改查等操作；

**Add-on：** 是对Kubernetes核心功能的扩展，例如增加网络和网络策略等能力。

```
kube-dns：负责为整个集群提供DNS服务
Ingress Controller：为服务提供外网入口
Heapster：提供资源监控
Dashboard：提供GUI
Federation：提供跨可用区的集群
Fluentd-elasticsearch：提供集群日志采集、存储与查询`
123456
```

![1](.\images\7.png)
K8s系统最核心的两个设计理念：一个是容错性，一个是易扩展性。容错性实际是保证K8s系统稳定性和安全性的基础，易扩展性是保证K8s对变更友好，可以快速迭代增加新功能的基础。

### 2.1、架构组件

**1、Master Node（主节点）**

**1.1 API Server（API服务器）**

API Server 以 Rest API 的形式提供了对资源进行 CRUD(增删改查) 的接口。主要用来**处理REST**的操作，确保它们生效，并执行相关业务逻辑，以及更新etcd（或者其他存储）中的相关对象。API Server是所有REST API的入口（唯一），是唯一能**直接**和 etcd 进行通信的，它的相关结果状态将被保存在etcd（或其他存储）中。API Server的基本功能包括：

> 1.REST语义，监控，持久化和一致性保证，API 版本控制，放弃和生效
> 2.内置准入控制语义，同步准入控制钩子，以及异步资源初始化
> 3.API注册和发现
> 4.另外，API Server也作为集群的**网关**。默认情况，客户端通过API Server对集群进行访问，客户端需要通过认证，并使用API Server作为访问Node和Pod（以及service）的堡垒和代理/通道。

关于并发冲突问题，API Server 使用**乐观锁机制**处理并发情况下资源更新产生冲突的问题。

> **悲观锁：** 每当读写的时候，就把该对象锁住，不允许其他线程对该对象进行读写，读写完毕之后，释放锁。
>
> **乐观锁**：每段数据包含一个版本号，每当更新数据时，该数据的版本号就会增加。当更新数据的操作提交的时候，就会检查版本号是否和读取时候的版本号相同，如果不同，则说明该数据在客户端读取该数据时间和提交时间之间被另一个客户端修改过，因此本次更新就会被拒绝，需要客户端重新读取新数据，重新尝试更新。如果相同，那么更新成功，增加此版本号。

所有的 k8s 资源都包含一个 metadata.resourceVersion 字段，这个字段就是充**当乐观锁机制中版本号**的作用。每当客户端更新对象的时候，客户端需要回传这个字段到 API Server，如果 resourceVersion 与 etcd 中存储的不一致，那么 API Server 就会拒绝本次更新操作。

**1.2 Cluster state store（集群状态存储）**

Kubernetes默认使用**etcd**作为集群整体存储，当然也可以使用其它的技术。etcd是一个简单的、分布式的、一致的key-value数据存储/数据库，主要被用来**共享配置**和**服务发现**。etcd提供了一个CRUD操作的REST API，以及提供了作为注册的接口，以监控指定的Node。集群的**所有状态**都存储在etcd实例中，并具有监控的能力，因此当etcd中的信息发生变化时，就能够快速的通知集群中相关的组件。etcd 使用 Raft 协议保证了数据的一致性。Raft 是一个强一致性协议，需要节点的个数为**奇数**个。

etcd 中的数据的存储形式**类似目录**，etcd 的每个 key 要么是一个目录，包含其他 key，要么只是对应一个值。k8s 将数据存储在 etcd 的 /registry 目录下，如下图所示：

![1](.\images\39.png)

![1](.\images\40.png)

![1](.\images\41.png)



API Server 将资源的完整定义**以 json 形式**存储 etcd 中。由于 etcd 的层级目录结构，可以想象成 API Server 把 k8s 资源以 json 文件的格式存储到了 etcd 中。如下图所示：
![1](.\images\42.png)

**1.3 Controller-Manager Server（控制管理服务器）**

Controller-Manager Serve用于执行大部分的集群层次的功能，它既执行生命周期功能(例如：命名空间创建和生命周期、事件垃圾收集、已终止垃圾收集、级联删除垃圾收集、node垃圾收集)，也执行API业务逻辑（例如：pod的弹性扩容）。控制管理提供自愈能力、扩容、应用生命周期管理、服务发现、路由、服务绑定和提供。Kubernetes默认提供Replication Controller、Node Controller、Namespace Controller、Service Controller、Endpoints Controller、Persistent Controller、DaemonSet Controller等控制器。

**1.4 Scheduler（调度器）**
scheduler组件为容器自动选择运行的主机。依据请求资源的可用性，服务请求的质量等约束条件，scheduler监控未绑定的pod，并将其绑定至特定的node节点。Kubernetes也支持用户自己提供的调度器，Scheduler负责根据调度策略自动将Pod部署到合适Node中，调度策略分为预选策略和优选策略，Pod的整个调度过程分为两步：

1）预选Node：遍历集群中所有的Node，按照具体的预选策略筛选出符合要求的Node列表。如没有Node符合预选策略规则，该Pod就会被挂起，直到集群中出现符合要求的Node。

2）优选Node：预选Node列表的基础上，按照优选策略为待选的Node进行打分和排序，从中获取最优Node。

**2、Worker Node（从节点）**

**2.1 Kubelet**

Kubelet是Kubernetes中最主要的控制器，**维护容器的生命周期**，并管理CSI（Container Storage Interface）和CNI（Conteinre Network Interface）。它是Pod和Node API的主要实现者，Kubelet负责驱动容器执行层。在Kubernetes中，应用容器彼此是隔离的，并且与运行其的主机也是隔离的，这是对应用进行独立解耦管理的关键点。

在Kubernets中，Pod作为基本的执行单元，它可以拥有多个容器和存储数据卷，能够方便在每个容器中打包一个单一的应用，从而解耦了应用构建时和部署时的所关心的事项，已经能够方便在物理机/虚拟机之间进行迁移。API准入控制可以拒绝或者Pod，或者为Pod添加额外的调度约束，但是Kubelet才是Pod是否能够运行在特定Node上的最终裁决者，而不是scheduler或者DaemonSet。kubelet默认情况使用cAdvisor进行资源监控。负责管理Pod、容器、镜像、数据卷等，实现集群对节点的管理，并将容器的运行状态汇报给Kubernetes API Server。

**2.2 Container Runtime（容器运行时）**
每一个Node都会运行一个Container Runtime，其负责下载镜像和运行容器。Kubernetes本身并不提供容器运行时环境，但提供了接口，可以插入所选择的容器的运行时环境。kubelet使用Unix socket之上的gRPC框架与容器运行时进行通信，kubelet作为客户端，而CRI shim作为服务器。
![1](.\images\8.png)

protocol buffers API提供两个gRPC服务，ImageService和RuntimeService。ImageService提供拉取、查看、和移除镜像的RPC。RuntimeSerivce则提供管理Pods和容器生命周期管理的RPC，以及与容器进行交互(exec/attach/port-forward)。容器运行时能够同时管理镜像和容器（例如：Docker和Rkt），并且可以通过同一个套接字提供这两种服务。在Kubelet中，这个套接字通过–container-runtime-endpoint和–image-service-endpoint字段进行设置。Kubernetes CRI支持的容器运行时包括docker、rkt、cri-o、frankti、kata-containers和clear-containers等。

**2.3 kube proxy**

基于一种公共访问策略（例如：负载均衡），服务提供了一种访问一群pod的途径。此方式通过创建一个虚拟的IP来实现，客户端能够访问此IP，并能够将服务透明的代理至Pod。每一个Node都会运行一个kube-proxy，kube proxy通过iptables规则引导访问至服务IP，并将重定向至正确的后端应用，通过这种方式kube-proxy提供了一个高可用的负载均衡解决方案。服务发现主要通过DNS实现。

在Kubernetes中，kube proxy负责为Pod创建代理服务；引到访问至服务；并实现服务到Pod的路由和转发，以及通过应用的负载均衡。

**3、 kubectl**
kubectl是Kubernetes集群的**命令行接口**。运行kubectl命令的语法如下所示：

$ kubectl [command] [TYPE] [NAME] [flags] //这里的command，TYPE、NAME和flags为：

comand：指定要对资源执行的操作，例如create、get、describe和delete;

TYPE：指定资源类型，资源类型是**大小写敏感**的，开发者能够以单数、复数和缩略的形式。例如：

$ kubectl get pod pod1
$ kubectl get pods pod1
$ kubectl get po pod1

NAME：指定资源的名称，名称也大小写敏感的。如果省略名称，则会显示所有的资源，例如:

$kubectl get pods

flags：指定可选的参数。例如，可以使用-s或者–server参数指定Kubernetes API server的地址和端口。

另外，可以通过运行kubectl help命令获取更多的信息。

**4、 add-one(附加项和其他依赖)**
在Kunbernetes中可以以附加项的方式扩展Kubernetes的功能，目前主要有网络、服务发现和可视化这三大类的附加项，下面是可用的一些附加项：

**4.1 网络和网络策略**

ACI 通过与Cisco ACI集成的容器网络和网络安全。
Calico 是一个安全的3层网络和网络策略提供者。
Canal 联合Fannel和Calico，通过网络和网络侧。
Cilium 是一个3层网络和网络侧插件，它能够透明的加强HTTP/API/L7 策略。其即支持路由，也支持overlay/encapsultion模式。
Flannel 是一个overlay的网络提供者。

**4.2 服务发现**
CoreDNS 是一个灵活的，可扩展的DNS服务器，它能够作为Pod集群内的DNS进行安装。

Ingress 提供基于Http协议的路由转发机制。

**4.3 可视化&控制**
Dashboard 是Kubernetes的web用户界面。

## 三、K8s分层架构

Kubernetes设计理念和功能其实就是一个类似Linux的分层架构，如下图所示：
![1](.\images\9.png)
**核心层：** Kubernetes最核心的功能，对外提供API构建高层的应用，对内提供插件式应用执行环境
**应用层：** 部署（无状态应用、有状态应用、批处理任务、集群应用等）和路由（服务发现、DNS解析等）
**管理层：** 系统度量（如基础设施、容器和网络的度量），自动化（如自动扩展、动态Provision等）以及策略管理（RBAC、Quota、PSP、NetworkPolicy等）
**接口层：** kubectl命令行工具、客户端SDK以及集群联邦
**生态系统：** 在接口层之上的庞大容器集群管理调度的生态系统，可以划分为两个范畴
**Kubernetes外部：** 日志、监控、配置管理、CI、CD、Workflow、FaaS、OTS应用、ChatOps等
**Kubernetes内部：** CRI、CNI、CVI、镜像仓库、Cloud Provider、集群自身的配置和管理等

## 四、kubenetes工作原理

![1](.\images\10.png)
![1](.\images\11.png)

1> 准备包含应用程序的Deployment的yml文件，然后通过kubectl客户端工具发送给ApiServer。

2> ApiServer接收到客户端的请求并将资源内容存储到数据库(etcd)中。

3> Controller组件(包括scheduler、replication、endpoint)监控资源变化并作出反应。

4> ReplicaSet检查数据库变化，创建期望数量的pod实例。

5> Scheduler再次检查数据库变化，发现尚未被分配到具体执行节点(node)的Pod，然后根据一组相关规则将pod分配到可以运行它们的节点上，并更新数据库，记录pod分配情况。

6> Kubelete监控数据库变化，管理后续pod的生命周期，发现被分配到它所在的节点上运行的那些pod。如果找到新pod，则会在该节点上运行这个新pod。

另：kuberproxy运行在集群各个主机上，管理网络通信，如服务发现、负载均衡。当有数据发送到主机时，将其路由到正确的pod或容器。对于从主机上发出的数据，它可以基于请求地址发现远程服务器，并将数据正确路由，在某些情况下会使用**轮循调度**算法(Round-robin)将请求发送到集群中的多个实例。

### 4.1、 Pod创建时序图

![1](.\images\12.png)
1 用户提交创建Pod的请求，可以通过API Server的REST API ，也可用Kubectl命令行工具，支持Json和Yaml两种格式；

2 API Server 处理用户请求，存储Pod数据到Etcd；

3 Schedule通过和 API Server的watch机制，查看到新的pod，尝试为Pod绑定Node；

4 过滤主机：调度器用一组规则过滤掉不符合要求的主机，比如Pod指定了所需要的资源，那么就要过滤掉资源不够的主机；

5 主机打分：对第一步筛选出的符合要求的主机进行打分，在主机打分阶段，调度器会考虑一些整体优化策略，比如把一个Replication Controller的副本分布到不同的主机上，使用最低负载的主机等；

6 选择主机：选择打分最高的主机，进行binding操作，结果存储到Etcd中；

7 kubelet根据调度结果执行Pod创建操作： 绑定成功后，会启动container, docker run, scheduler会调用API Server的API在etcd中创建一个bound pod对象，描述在一个工作节点上绑定运行的所有pod信息。运行在每个工作节点上的kubelet也会定期与etcd同步bound pod信息，一旦发现应该在该工作节点上运行的bound pod对象没有更新，则调用Docker API创建并启动pod内的容器。

### 4.2、Kube-Master 的工作流程图

![1](.\images\13.png)

> 1.Kubecfg 将特定的请求发送给 Kubernetes Client（比如：创建 Pod 的请求）。
> 2.Kubernetes Client 将请求发送给 API Server。
> 3.API Server 会根据请求的类型选择用何种 REST API 对请求作出处理（比如：创建 Pod 时 Storage 类型是 Pods 时，其对应的就是 REST Storage API）。
> 4.REST Storage API 会对请求作相应的处理并将处理的结果存入高可用键值(KV)存储系统 Etcd 中。
> 5.在 API Server 响应 Kubecfg 的请求后，Scheduler 会根据 Kubernetes Client 获取的集群中运行 Pod 及 Minion / Node 信息将未分发的 Pod 分发到可用的 Minion / Node 节点上。

### 4.3、API Server

API Server 提供了**资源对象**的**唯一操作入口**，其它所有组件都必须通过它提供的 API 来操作资源数据。**只有** API Server 会与Ectd存储通信，其它模块都必须通过 API Server 访问集群状态。

API Server 作为 Kubernetes 系统的入口，封装了核心对象的增删改查操作。API Server 以 RESTFul 接口方式提供给外部客户和内部组件调用，API Server 再对相关的资源数据（全量查询 + 变化监听）进行操作，以达到**实时**完成相关的业务功能。

以 API Server 为 Kubernetes 入口的设计主要有以下好处：

> 1. 保证了集群状态访问的安全。
> 2. API Server 隔离了集群状态访问和后端存储实现，这样 API Server 状态访问的方式不会因为后端存储技术 Etcd 的改变而改变，让后端存储方式选择更加灵活，方便了整个架构的扩展。

API Server 服务器的客户端之一就是 kubectl。比如，当以 json 文件的形式请求创建一个 k8s 资源的时，kubectl 通过 HTTP POST 请求的形式将文件内容上传到 API Server。下图显示了接收到请求后的 API Server 内部发生的事情：
![1](.\images\14.png)
**(1) 认证 (Authentication)**

首先，API Server 需要对发送请求的客户端进行认证。这是通过配置在 API Server 上的一个或多个**认证插件**来实现的。API Server 轮询这些认证插件，检查这个 HTTP 请求，直到有一个能确认是谁发送的请求。一旦有认证插件确认了请求的发送者，那么后续的认证插件就不需要调用了，直接进入授权阶段。

**(2) 授权 (Authorization)**

授权的作用是决定认证的用户是否可以对请求的资源进行请求中的操作。API Server 可以配置使用一个或者**多个授权插件**。例如，当创建 pod 的时候，API Server 会轮询所有的授权插件，来确认用户是否可以在请求的 namespace 中创建 pod。一旦有授权插件确认了用户可以执行该操作，API Server 就会进入到准入控制的阶段。

**(3) 准入控制 (Admission Control)：**

如果请求尝试创建、修改或者删除一个资源，请求需要经过准入控制插件的验证。注意，如果请求只是尝试**读取**数据，则**不会**进过准入控制阶段。

同理，API Server 也可以配置一个或多个准入控制插件。这些插件可以根据某些原因修改资源，比如初始化资源定义中的 spec 字段中某些属性为其默认值甚至覆盖/重写他们。插件甚至会去修改并不在请求中的相关资源，同时也为因为某些原因拒绝一个请求。

**注意**：与认证和授权不同，资源需要经过所有准入控制插件的验证。

准入控制插件的一些例子如下：

> AlwaysPullImages：重写 pod 的 imagePullPolicy 为 Always，总是从远程仓库拉取镜像。
>
> ServiceAccount：为没有明确指定 serviceAccount 的 pod 设置默认的 serviceAccount。
>
> ResourceQuota：保证在特定 namespace 下的 pod 使用的 cpu 和内存不超过该 namespace 所分配的 cpu 和内存限额。

更多的准入控制插件可查看：[ k8s 文档准入控制文档](https://kubernetes.io/docs/admin/admission-controllers/)。

**(4) 进行资源的验证以及持久化存储到 etcd**

当请求通过了所有的准入控制插件之后，API Server 对该对象进行最后的资源验证，之后将其存储到 etcd 中，并返回一个响应给客户端。

**【API Server 的 list/watch 机制】：**

> API Server 的作用就是将资源(的定义)存储到 etcd 中，并且将变更通知给别的组件，并不会做其他额外的工作。例如，当你创建一个 ReplicaSet 资源的时候，API Server 不会去创建 pod，同时它也不会去管理 service 中的 endpoint，因为这些都是 controller manager 的工作。
>
> API Server 甚至也没有告诉这些 controller 要去做什么，API Server只是启动这些 controller 以及其他一些组件来监控已部署资源的变更。
>
> Master 节点中的其他组件都可以向 API Server 订阅相关资源变更(创建、修改或删除)的通知，当资源产生变更之后，这些组件可以收到 API Server 发给它们的变更通知。
> 换句话说，Master 中的其他组件都可以通过 API Server **对资源进行 watch**, 当这些资源在 etcd 中变更之后，API Server 会向对应的组件发送 notification 通知。这也就是 API Server 的 watch/notification 机制。 如下图所示：
> ![1](.\images\15.png)

**list-watch操作需要做这么几件事：**

> 由组件向apiserver而不是etcd发起**watch请求**，在组件启动时就进行订阅，告诉apiserver需要知道什么数据发生变化。Watch是一个典型的发布-订阅模式。
>
> 组件**向apiserver**发起的watch请求是可以**带条件**的，例如，scheduler想要watch的是所有未被调度的Pod，也就是满足Pod.destNode=""的Pod来进行调度操作；而kubelet只关心自己节点上的Pod列表。apiserver向etcd发起的watch是没有条件的，只能知道某个数据发生了变化或创建、删除，但不能过滤具体的值。也就是说对象数据的条件过滤必须在apiserver端而不是etcd端完成。
>
> list是作为watch失败，数据太过陈旧后的弥补手段，list本身是一个简单的列表操作，和其它apiserver的增删改操作一样。

下图是一个Pod的创建过程，我们可以看下API Server在其中的作用：
![1](.\images\16.png)
API Server 的作用就是对请求经过认证、授权、准入控制之后，将资源存储到 etcd 中，以及向所有的 watcher 发送 notification 通知。

### 4.4、Controller Manager：内部管理控制中心

Controller Manager 用于实现 Kubernetes 集群**故障检测**和恢复的自动化工作。

Controller Manager 主要负责执行以下各种控制器：

> 1.Replication Controller
> Replication Controller 的作用主要是**定期关联** Replication Controller (RC) 和 Pod，以保证集群中一个 RC (一种资源对象) 所关联的 Pod 副本数始终保持为与预设值一致。
>
> 2.Node Controller
> Kubelet 在启动时会通过 API Server **注册自身**的节点信息，并定时向 API Server 汇报状态信息。API Server 在接收到信息后将信息更新到 Etcd 中。
>
> Node Controller 通过 API Server **实时获取** Node 的相关信息，实现管理和监控集群中的各个 Node 节点的相关控制功能。
>
> 3.ResourceQuota Controller
> 资源配额管理控制器用于确保指定的资源对象在任何时候都不会超量占用系统上物理资源。
>
> 4.Namespace Controller
> 用户通过 API Server 可以创建新的 Namespace 并保存在 Etcd 中，Namespace Controller 定时通过 API Server 读取这些 Namespace 信息来操作 Namespace。
>
> 比如：Namespace 被 API 标记为优雅删除，则将该 Namespace 状态设置为 Terminating 并保存到 Etcd 中。同时 Namespace Controller 删除该 Namespace 下的 ServiceAccount、RC、Pod 等资源对象。
>
> 5.Service Account Controller
> Service Account Controller (服务账号控制器)，主要在命名空间内管理 ServiceAccount，以保证名为 default 的 ServiceAccount 在每个命名空间中存在。
>
> 6.Token Controller
> Token Controller（令牌控制器）作为 Controller Manager 的一部分，主要用作：监听 serviceAccount 的创建和删除动作以及监听 secret 的添加、删除动作。
>
> 7.Service Controller
> Service Controller 是属于 Kubernetes 集群与外部平台之间的一个接口控制器，Service Controller 主要用作**监听 Service** 的变化。
>
> 比如：创建的是一个 LoadBalancer 类型的 Service，Service Controller 则要确保外部的云平台上对该 Service 对应的 LoadBalancer 实例被创建、删除以及相应的路由转发表被更新。
>
> 8.Endpoint Controller
> Endpoints 表示了一个 Service 对应的所有 Pod 副本的访问地址，而 Endpoints Controller 是负责生成和维护所有 Endpoints 对象的控制器。
>
> Endpoint Controller 负责监听 Service 和对应的 Pod 副本的变化。**定期关联** Service 和 Pod (关联信息由 Endpoint 对象维护)，以保证 Service 到 Pod 的**映射**总是最新的。

Controller 会做很多不同的事情，但是它们都通过 API Server 对它们所管理的资源进行了 watch，当资源发生变更时，对应的 Controller 会执行相关操作；

Controller 不会每次都去轮询 pod，而是通过 API Server 的 watch 机制，订阅可能影响期望的副本集数量(replicas) 或者符合 pod 数量的变更事件。任何该类型的变化，都会触发 Controller 重新检查期望的以及实际的副本集数量，然后做出相应操作。

总的来说，Controller 中运行了一个"调和 (reconcile)"循环，将实际状态调整为期望状态(在资源的 spec 字段中定义)，然后将新的实际状态写入资源的 status 字段。Controller 使用 API Server 的 watch 机制来订阅变更通知，但是这个变更通知也有可能因为某些原因产生丢包，导致对应的 Controller 遗漏了这个通知，因此，Controller 中会定期使用 list 操作来确保它们不会遗漏什么。

Controller 之间不会直接通信，它们甚至都不知道其他 Controller 的存在。每个 Controller 都连接到 API Server，通过 API Server 的 watch 机制，请求订阅相应类型资源的变更通知。

### 4.4、Scheduler：集群分发调度器

Scheduler 主要用于收集和分析当前 Kubernetes 集群中所有 Minion / Node 节点的资源 (包括内存、CPU 等) 负载情况，然后依据资源占用情况分发新建的 Pod 到 Kubernetes 集群中可用的节点上。Scheduler 会**实时监测** Kubernetes 集群中未分发和已分发的所有运行的 Pod。实时监测 Minion / Node 节点信息，由于会频繁查找 Minion/Node 节点，Scheduler 同时会**缓存**一份最新的信息在本地。Scheduler 在分发 Pod 到指定的 Minion / Node 节点后，会把 Pod 相关的**信息 Binding** 写回 API Server，以方便其它组件使用。

![1](.\images\17.png)
Scheduler 是通过 API Server 更新 pod 的定义(更新 nodeName 字段)，根据调度算法将 pod 调度到某一个具体的 node 中，然后 API Server再去通知其上的 kubelet，它就会创建并且运行 pod 中包含的容器。

可以在集群中运行多个调度器，然后在 pod 的 spec 字段中指定 schedulerName 来指定特定的调度器来调度此 pod。如果未设置 schedulerName, 那么其将被设置为默认值：default-scheduler。可以自定义实现自己的调度器，然后部署到集群，或者也可以根据不同的配置项部署另外的 Scheduler 实例。

### 4.5、Kube-Node

![1](.\images\18.png)
**1）Kubelet：节点上的 Pod 管家**

负责 Node 节点上 Pod 的创建、修改、监控、删除等全生命周期的管理。定时上报本地 Node 的状态信息给 API Server。

Kubelet 是 Master API Server 和 Minion / Node 之间的桥梁，接收 Master API Server 分配给它的 Commands 和 Work。

Kubelet 通过 Kube ApiServer 间接与 Etcd 集群交互来读取集群配置信息。

Kubelet 在 Node 上做的主要工作具体如下：

> 1. 设置容器的环境变量、给容器绑定 Volume、给容器绑定 Port、根据指定的 Pod 运行一个单一容器、给指定的 Pod 创建 Network 容器。
> 2. 同步 Pod 的状态，从 cAdvisor 获取 Container Info、 Pod Info、 Root Info、 Machine info。
> 3. 在容器中运行命令、杀死容器、删除 Pod 的所有容器。

**2）Proxy：负载均衡、路由转发**

Proxy 是为了解决外部网络能够访问集群中容器提供的应用服务而设计的，Proxy 运行在每个 Minion / Node 上。

Proxy 提供 TCP / UDP 两种 Sockets 连接方式 。每创建一个 Service，Proxy 就会从 Etcd 获取 Services 和 Endpoints 的配置信息（也可以从 File 获取），然后根据其配置信息在 Minion / Node 上启动一个 Proxy 的进程并监听相应的服务端口。当外部请求发生时，Proxy 会根据 Load Balancer 将请求分发到后端正确的容器处理。

Proxy 不但解决了同一宿主机相同服务端口冲突的问题，还提供了 Service 转发服务端口对外提供服务的能力。Proxy 后端使用随机、轮循等负载均衡算法进行调度。

3）Kubectl：集群管理命令行工具集

Kubectl 是 Kubernetes 的 客户端的工具。 通过 Kubectl 命令对 API Server 进行操作，API Server 响应并返回对应的命令结果，从而达到对 Kubernetes 集群的管理。

### 4.6、Replication Manager

Replication Manager 的作用就是启动 ReplicationController。ReplicationController 的操作可以理解为一个无限循环，在每次循环中都会查找符合其 pod selector 中的 pod 数量是否与 replicationController 中 replicas 字段中定义的副本数一致，如果不一致，那么会调整为 replicas 字段中定义的数量。
![1](.\images\19.png)
当运行的 pod 实例小于 replicas 字段定义的数量时，ReplicationController 会运行额外的 pod 实例，但它自己实际上不会去运行 pod，而是会创建新的 pod 资源清单(manifest)，将其发布到 API Server，然后让调度器以及 kubelet 来做调度工作并运行 pod。

### 4.7、Kubelet（Node代理）

Kubelet 运行在 worker node 上。简单来说，Kubelet 是负责管理所有运行在工作节点上的事情。Kubelet 的第一个任务就是在 API Server 中创建一个 **Node 资源**来注册该节点。然后需要持续监控 API Server，观察是否有 pod 被调度到了此节点，如果有，则告知配置好的 Container Runtime (如Docker, rkt等)来从特定容器镜像运行容器。Kubelet 随后持续监控运行的容器，向 API Server 报告它们的状态、事件和资源消耗情况。
![1](.\images\20.png)

Kubelet 也是运行容器**存活性探针**(livenessProbe)的组件，当探针失败的时候重启容器。最后一点，当 pod 从 API Server 中删除的时候，Kubelet 将终止容器并且通知 API Server 该 pod 已经被终止了。

Kubelet 除了可以从 API Server 的通信中获取 pod 资源清单之外，还可以基于指定目录下的 **pod 资源清单**来运行 pod，kubelet 定期的去扫描这个目录，根据这个目录下出现或消失的 YAML/JSON 文件来创建或删除 pod,这种 pod 称为 **static pod**(静态 pod)。

## 五、K8s相关概念理解

### **5.1、Pod**：

一般指计算节点，包含一组容器和卷。K8s有很多技术概念，同时对应很多API对象，最重要的也是最基础的是微服务Pod。Pod是在K8s集群中运行部署应用或服务的最小单元，是最小的API操作对象，最小的调度单元，可以支持多容器。Pod的设计理念是支持多个容器在一个Pod中共享网络地址和文件系统，这样k8s就会以整个Pod作为资源的调度级，而不是其内的容器了，pod内所有容器共享同一个network的Namespace，也可共享同一个volume，可以通过**进程间通信**和**文件共享**这种简单高效的方式组合完成服务。Pod对**多容器的支持**是K8s最基础的设计理念。比如你运行一个操作系统发行版的软件仓库，一个Nginx容器用来发布软件，另一个容器专门用来从源仓库做同步，这两个容器的镜像不太可能是一个团队开发的，但是他们一块儿工作才能提供一个微服务；这种情况下，不同的团队各自开发构建自己的容器镜像，在部署的时候组合成一个微服务对外提供服务。这对当我们想一起运行一个软件的多个模块的时候很有用，而不用考虑每一个模块都使用一个容器，管理多容器的困扰，Pod就可满足，把这些应用部署为**一组容器**，并将这些容器组彼此分隔，每个容器组（pod）共享一个环境。Pod隐藏了docker中复杂的**标志位**以及管理docker容器、共享卷及其他docker资源的复杂性。同时也隐藏了不同容器运行环境的差异。

每个Pod就是包含一个/多个紧密相关业务的多个容器的集合；这些容器所提供的服务是**紧密业务性关联**的，且运行在**同一个工作节点**上/同一个Linux命名空间中，一般利用namespace进行资源隔离。每个pod可看作是一个独立的**逻辑主机**，拥有独立的IP、主机名、进程等，运行一个独立的应用程序。一个Pod上运行的所有容器都运行在同一个工作节点上，而非跨多个工作节点（物理主机）。pod作为Node上的一个**进程**，是有生命周期的,宕机、版本更新都会创建新的pod,此时ip地址发生变化，hostname也会发生变化。

原则上，任何人只需要创建一个父容器就可以配置docker来管理容器组之间的共享问题。这个父容器需要能够准确的知道如何去创建共享运行环境的容器，还能管理这些容器的生命周期。为了实现这个父容器的构想，kubernetes中，用pause容器来作为一个pod中所有容器的父容器。这个pause容器有两个核心的功能，第一，它提供整个pod的Linux命名空间的基础。第二，启用PID命名空间，它在每个pod中都作为PID为1进程，并回收僵尸进程。

每个Pod都有一个特殊的Pause容器（又称infra容器，它使用了名为pause的特殊镜像，大小100-200KB），称为Pod的“根容器”。Pod中其他的容器均是通过 join network namespace方式定义，称为**用户业务容器**。通过Pod的根容器，可以将它的状态来代表整个Pod的状态，从而对Pod整理管理和监控，Pause容器是：业务无关且不易消亡的容器。Pod内的多个业务容器，共享Pause容器的IP及挂载的volume。每个 Pod 至少会有一个 Pause 容器。
![1](.\images\21.png)
eg1：创建一个pause容器：将本机的8080端口代理/映射到pause容器的80端口

```powershell
docker pull docker.io/kubernetes/pause ##拉取pause镜像
docker tag docker.io/kubernetes/pause:latest gcr.io/google_containers/pause-amd64:3.0
docker run -d --name pause -p 8080:80 gcr.io/google_containers/pause-amd64:3.0
123
```

eg2：创建新的容器，加入Pause容器的Namespace里

```bash
$ docker run -d --name nginx -v `pwd`/nginx.conf:/etc/nginx/nginx.conf --net=container:pause --ipc=container:pause --pid=container:pause nginx

$ docker run -d --name ghost --net=container:pause --ipc=container:pause --pid=container:pause ghost
123
```

如上面的例子中，我们用pause容器为其他容器提供了共享的命名空间，Pod内容器支架，可直接使用localhost进行通信，流量进出都出通过Pause容器跳转出去的，网络设备与Pause设备一样，示意如下：
![1](.\images\22.png)
**关于如何回收僵尸进程：**

首先在Linux中，存在父进程的进程会在同一个PID命名空间中行成一个**树形结构**。其中，位于根节点的进程没有父进程，这个进程就是PID为1的init进程。

进程可以通过**fork和exec**系统调用来**创建其他进程**，而这个使用fork系统调用的进程就成为新建进程的父进程。Fork用来**创建当前进程**的另一个**拷贝**，**exec**用来运行新的进程以**代替当前进程**，此时新进程的PID和被替代进程的PID是一样的（为了运行一个完全独立的应用，你需要执行fork以及exec系统调用，使用fork来为当前进程创建一个拥有新PID的子进程，然后当子进程检测他自己是否是子进程时，执行exec从而用你想要运行的进程来替代本身，大多是语言都提供了函数以实现这一方法）。每个进程在系统进程表里有存在一条记录。它记录了关于进程状态和退出码的相关信息。当子进程已经结束运行时，它在进程表中的记录仍然存在，只有当父进程通过使用wait系统调用取回了它的退出码。这个过程就叫做回收僵尸进程。即僵尸进程为那些已经停止运行但因为父进程没有释放导致他们在进程表中的记录仍然存在的一类进程。父进程没有被释放主要是因为没有通过调用wait将这些进程状态上报。放在容器中，每个PID命名空间必须有一个进程作为init进程。Docker中每个容器通常有自己的PID命名空间，入口点进程是init进程。但是，在kubernetes pod中，我们可以使容器在另一个容器的命名空间中运行。在这种情况下，一个容器必须承担init进程的角色，而**其他容器则作为init进程的子元素**添加到命名空间中即可。如前所述，在Kubernetes pods中，为每个pod创建了一个特殊的**暂停容器**。这个pause容器运行一个非常简单的进程，它不执行任何函数，但本质上是永久休眠的；但其一个重要功能是作为整个pod中PID 1的角色，当僵尸被父进程孤立时，通过调用wait 来捕获僵尸进程。这样就不会让僵尸在Kubernetes pod的PID命名空间中长期堆积了。但是如果**没有启用PID命名空间共享**，那么Kubernetes pod中的**每个容器都有自己的PID 1**，并且每个容器**都需要自己捕获僵尸进程**。很多时候这并不是一个问题，因为应用程序一般不会生成其他进程，但是僵尸进程占用内存是一个经常被忽略的问题。因此，基于PID命名空间共享使我们能够在相同pod中的容器之间发送信号，最好我们使用中还是开启：

编辑kubelet配置文件：vi /etc/systemd/system/kubelet.service.d/10-kubeadm.conf，默认内容如下：

```bash
[Service]
Environment="KUBELET_KUBECONFIG_ARGS=--kubeconfig=/etc/kubernetes/kubelet.conf --require-kubeconfig=true --docker-disable-share-pid=false" ##新增标志，启用PID命名空间共享（未验证）
Environment="KUBELET_SYSTEM_PODS_ARGS=--pod-manifest-path=/etc/kubernetes/manifests --allow-privileged=true"
Environment="KUBELET_NETWORK_ARGS=--network-plugin=cni --cni-conf-dir=/etc/cni/net.d --cni-bin-dir=/opt/cni/bin"
Environment="KUBELET_DNS_ARGS=--cluster-dns=100.64.0.10 --cluster-domain=cluster.local"
Environment="KUBELET_EXTRA_ARGS=--v=4"
Environment="DEF_ARGS=--max-pods=40"  ##新增标志

ExecStart=
ExecStart=/usr/bin/kubelet $KUBELET_KUBECONFIG_ARGS $KUBELET_SYSTEM_PODS_ARGS $KUBELET_NETWORK_ARGS $KUBELET_DNS_ARGS $KUBELET_EXTRA_ARGS


123456789101112
```

上述配置信息，可执行ps aux|grep kublet，且kublet的启动参数与上述配置是一致的；修改配置文件后需要重启kublet：

```bash
systemctl stop kubelet    ##停止kubelet
systemctl daemon-reload   ##重新载入systemd
systemctl start kubelet   ##启动kubelet
123
```

Pod是虚拟的资源对象（它是一个进程），没有对应实体版本（物理机，物理网卡）与之对应，无法对外提供服务访问。pod如果想要对外提供服务，必须绑定物理机端口（在物理机上开启端口，让这个端口和pod端口进行映射），这样就可以通过物理机进行数据包的转发。

Pod是K8s集群中**所有业务类型**的基础，可以看作运行在K8s集群中的小机器人，不同类型的业务就需要不同类型的小机器人去执行。目前K8s中的业务主要可以分为**长期伺服型**（long-running）、批处理型（batch）、节点后台支撑型（node-daemon）和有状态应用型（stateful application）；分别对应的小机器人控制器为Deployment、Job、DaemonSet和PetSet，同一个Pod里的容器共享同一个**网络命名空间**，可以使用localhost互相通信。Pod是短暂的，不是持续性的实体。你可能会有这些问题：

1）如果Pod是短暂的，那么我怎么才能持久化容器数据使其能够跨重启而存在呢？ 是的，Kubernetes支持 卷 的概念，因此可以使用持久化的卷类型。

2）是否手动创建Pod，如果想要创建同一个容器的多份拷贝，需要一个个分别创建出来么？可以手动创建单个Pod，但是也可以使用Replication Controller使用Pod模板创建出多份拷贝。

3）如果Pod是短暂的，那么重启时IP地址可能会改变，那么怎么才能从前端容器正确可靠地指向后台容器呢？这时可以使用Service。

### **5.2、Label（标签）**：

一些Pod有Label（enter image description here）。一个Label是attach到Pod的**一对键/值对**，用来**传递**用户定义的属性。比如，当创建了一个"tier"和“app”标签，通过Label（tier=frontend, app=myapp）来标记前端Pod容器，使用Label（tier=backend, app=myapp）标记后台Pod。然后可以使用 Selectors 选择带有特定Label的Pod，并且将Service或者Replication Controller应用到上面。通过将 Label 指定到对应的资源对象中，如 Node、Pod、Replica Set、Service 等，一个资源可以绑定任意个 Label，k8s 通过 Label 可实现多维度的**资源分组管理**。

**Replication Controller**：是否手动创建Pod，如果想要创建同一个容器的多份拷贝，需要一个个分别创建出来么，能否将Pods划到逻辑组里？Replication Controller确保任意时间都有指定数量的Pod“副本”在运行。如果为某个Pod创建了Replication Controller并且指定3个副本，它会创建3个Pod，并且持续监控它们。如果某个Pod不响应，那么Replication Controller会替换它，保持总数为3.如下面的动画所示：
![1](.\images\23.png)
![1](.\images\24.png)
![1](.\images\25.png)
![1](.\images\26.png)
如果之前不响应的Pod恢复了，现在就有4个Pod了，那么Replication Controller会将其中一个终止保持总数为3。如果在运行中将副本总数改为5，Replication Controller会立刻启动2个新Pod，保证总数为5。当创建Replication Controller时，需要指定两个东西：

1）Pod模板：用来创建Pod副本的模板

2）Label：Replication Controller需要监控的Pod的标签。现在已经创建了Pod的一些副本，那么在这些副本上如何均衡负载呢？我们需要的是Service。

### **5.3、Service**：

如果Pods是短暂的，那么**重启时**IP地址可能会改变，怎么才能从前端容器正确可靠地指向后台容器呢？== Service 抽象==；service和pod**都是一个进程**，service也不能对外提供服务。

service和pod可以直接进行通信，它们的通信属于**局域网通信**。外部把请求交给service后，service使用（iptables，ipvs）做**数据包分发**。service和**一组pod副本**通过**标签选择器**进行关联。endpoints存储所有pod的ip地址 ，kube-proxy监听所有pod，发现pod变化去更新存储在etcd中的endpoints中的映射关系。

现在，假定有2个后台Pod，并且定义后台Service的名称为‘backend-service’，label选择器为(tier=backend, app=myapp) 的Service会完成如下两件重要的事情：

a）会为Service创建一个本地集群的DNS入口，因此前端Pod只需要DNS查找主机名为 ‘backend-service’，就能够解析出前端应用程序可用的IP地址。

b）现在前端已经得到了后台服务的IP地址，但是它应该访问2个后台Pod的哪一个呢？Service在这2个后台Pod之间提供**透明的负载均衡**，会将请求分发给其中的任意一个（如下所示）。通过每个Node上运行的代理（kube-proxy）完成。

![1](.\images\27.png)
![1](.\images\28.png)
![1](.\images\29.png)
每个节点都运行如下Kubernetes关键组件：

1>Kubelet：是主节点代理。Kubelet组件运行在Node节点上，维持运行中的Pods以及提供kuberntes**运行**时环境，主要完成以下使命：

> １．监视分配给该Node节点的pods
> ２．挂载pod所需要的volumes
> ３．下载pod的secret
> ４．通过docker/rkt来运行pod中的容器
> ５．周期的执行pod中为容器定义的liveness探针
> ６．上报pod的状态给系统的其他组件
> ７．上报Node的状态

2>Kube-proxy：Service使用其将链接**路由**到Pod，如上文所述。
3>Docker或Rocket：Kubernetes使用的容器技术来创建容器。

每个Pod具有IP地址，当使用Deployment控制器时，Pod的IP地址往往动态变化。而service可谓为一组功能相同的pod 提供单一不变的接入点（Service IP固定）资源，无论Pod的IP地址变化如何，都不允许service IP；外部用户使用该IP地址与Service中的Pod通信。客户端向service IP地址发送请求，然后请求会被路由到Service的其中一个Pod。 Service通过选择器selector来识别器成员Pod。为使得Pod成为Service的成员，该Pod必须具有选择器中指定的所有标签label。Service主要是提供负载均衡和服务自动发现。创建Service时，kubernetes会创建一个与Service同名的EndPoints对象。kubernetes使用Endpoints对象来跟踪哪些Pod属于Service的成员。 Endpoint 资源就是暴露一个服务的IP 地址和端口的列表， Endpoint 资源和其他Kubernetes 资源一样，可以使用kubectl info 来获取它的基本信息。

【5种Service类型】：
![1](.\images\30.png)
![1](.\images\31.png)
同一个服务暴露多个端口：
![1](.\images\32.png)

用法1：kubectl expose 服务名字 //创建服务
用法2：kubectl get svc或services //获取服务列表
![1](.\images\33.png)
在运行的容器中远程执行命令：
![1](.\images\34.png)
eg1：获取服务的信息：

```bash
$ kubectl describe svc kubia
Name:              kubia
Namespace:         default
Labels:            <none>
Annotations:       <none>
Selector:          app=kubia
Type:              ClusterIP
IP:                10.0.0.180
Port:              <unset>  80/TCP
TargetPort:        8080/TCP
Endpoints:         172.10.0.103:8080,172.10.0.127:8080,172.10.0.128:8080 + 3 more...
Session Affinity:  None
Events:            <none>

#获取endpoint信息
$ kubectl get endpoints kubia
NAME    ENDPOINTS                                                           AGE
kubia   172.10.0.103:8080,172.10.0.127:8080,172.10.0.128:8080 + 3 more...   130m
123456789101112131415161718
```

手动创建endpoint资源：
![1](.\images\35.png)
其他参考：[K8s Service原理介绍](https://www.cnblogs.com/wn1m/p/11288131.html)

**5.4、Kubernetes Master**

集群拥有一个Kubernetes Master（上图紫框）。Kubernetes Master提供集群的独特视角，并且拥有一系列组件，比如Kubernetes API Server。API Server提供可以用来和集群交互的REST端点。master节点包括用来创建和复制Pod的Replication Controller。
![1](.\images\36.png)

**5.5、 名字空间（Namespace）**：K8s集群提供虚拟的**隔离作用**，K8s集群**初始**有两个名字空间，分别是默认名字空间default和系统名字空间kube-system，除此以外，管理员可以可以创建新的名字空间满足需要。当使用Docker运行容器时，Docker为每个容器创建命名空间和cgroups，容器和命名空间会一一映射。
![1](.\images\37.png)

**5.6、用户帐户（User Account）和服务帐户（Service Account）：** 服务账户为计算机进程和K8s集群中运行的Pod提供账户标识。用户帐户和服务帐户的一个区别是作用范围；用户帐户对应的是人的身份，人的身份与服务的namespace无关，所以用户账户是跨namespace的；而服务帐户对应的是一个运行中程序的身份，与特定namespace是相关的。

**5.7、节点（Node）**：K8s集群中的计算能力由Node提供，最初Node称为服务节点Minion，后来改名为Node。K8s集群中的Node也就等同于Mesos集群中的Slave节点，是所有Pod运行所在的**工作主机**，可以是物理机也可以是虚拟机。不论是物理机还是虚拟机，工作主机的统一特征是上面要运行kubelet管理节点上运行的容器。

**5.8、持久存储卷（Persistent Volume，PV）和持久存储卷声明（Persistent Volume Claim，PVC）**：PV和PVC使得K8s集群具备了存储的逻辑抽象能力，使得在配置Pod的逻辑里可以忽略对实际后台存储技术的配置，而把这项配置的工作交给PV的配置者，即集群的管理者。存储的PV和PVC的这种关系，跟计算的Node和Pod的关系是非常类似的；PV和Node是资源的提供者，根据集群的基础设施变化而变化，由K8s集群管理员配置；而PVC和Pod是资源的使用者，根据业务服务的需求变化而变化，有K8s集群的使用者即服务的管理员来配置。

**5.9、cgroup**: Pods允许我们指定要运行的容器，Kubernetes自动以正确的方式设置命名空间和cgroups。Kubernetes不使用Docker网络(它使用CNI)。
![1](.\images\38.png)

如上图示：Pod中每个容器进程都像是在同一台机器上运行。它们可以在localhost上相互通信，可以使用共享卷。它们甚至可以使用IPC或互相发送HUP或TERM之类的信号(在Kubernetes 1.7中共享PID命名空间，Docker >=1.13)。如果使用Docker的方式，比如两个进程需要通信，他们需要都放在一个容器中，且因为Docker只能设置一个ENTRYPOINT，所以我们需要使用监控进程来保持两个进程都运行，但是Docker只能看到监控进程。它对每个进程并没有可见性，这意味着用户和其他工具无法通过Docker API获得这些进程运行信息的，如果其中一个进程崩溃，则业务就会受到影响，但Docker并不知道。而Kubernetes通过pods资源可以管理每个进程，从而洞察其状态。通过这种方式，它可以通过API向用户提供关于该pod状态的信息，还可以提供服务，比如在它崩溃时重新启动它或自动记录日志。

**5.10、k8s集群网络：** 其中包含如下几类ip地址：

pod ip： pod ip地址
node ip： 物理机ip地址
cluster ip： 虚拟ip，由kubenetes抽象出的service对象，service对象即是一个vip的资源对象。

## 六、K8s集群

## 附录：文献来源参考

1）[K8s组件的内部工作原理详解 ](https://www.cnblogs.com/FengZeng666/p/14957252.html)；

2）[K8s官方文档](https://kubernetes.io/docs/reference/)；



