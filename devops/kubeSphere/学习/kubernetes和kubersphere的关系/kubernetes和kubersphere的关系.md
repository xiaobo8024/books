

# kubernetes和kubersphere的关系

## 一、概要

我们都知道[kubernetes](https://so.csdn.net/so/search?q=kubernetes&spm=1001.2101.3001.7020)（k8s）是容器的一个编排解决方案，kubersphere是容器的云化管理平台；那这2者的关系是怎么样的呢？有什么前世今生，纠葛呢？
  Kubernetes（K8s）是Google公司开源的一个容器（[Container](https://so.csdn.net/so/search?q=Container&spm=1001.2101.3001.7020)）**编排与调度管理框架**，该项目最初是Google内部面向容器的集群管理系统，而现在是由[Cloud](https://so.csdn.net/so/search?q=Cloud&spm=1001.2101.3001.7020) Native Computing Foundation（CNCF，云原生计算基金会）托管的开源平台，由Google、AWS、Microsoft、IBM、Intel、Cisco和Red Hat等主要参与者支持，其目标是通过**创建一组新的通用容器技术**来推进云原生技术和服务的开发。作为领先的**容器编排引擎**，Kubernetes提供了一个**抽象层**，使其可以在物理或虚拟环境中部署容器应用程序，提供以容器为中心的基础架构。Kubernetes系统还拥有一个庞大而活跃的开发人员社区，这使其成为历史上增长最快的开源项目之一。它是GitHub上排名前10的项目，也是Go语言最大的开源项目之一，主要特点：

> 可移植：支持公有云、私有云、混合云、多重云（Multi-cloud）。
>
> 可扩展：模块化、插件化、可挂载、可组合。
>
> 自动化：自动部署、自动重启、自动复制、自动伸缩/扩展。

  Kubernetes系统用于管理分布式节点集群中的微服务或容器化应用程序，并且其提供了零停机时间部署、自动回滚、缩放和容器的自愈（其中包括自动配置、自动重启、自动复制的高弹性基础设施，以及容器的自动缩放等）等功能。k8s支持众多云原生组件和应用，庞大而复杂；主要面向研发人员，使其更专注与业务，而这对于最终用户来管理就有些困难；下图是一些基于k8s的众多发行版：
![1](.\images\1.png)

  KubeSphere 是国内一家青云（QingCloud）公司在 Kubernetes 之上构建的面向云原生应用的容器混合云，支持多云与多集群管理，提供全栈的 IT 自动化运维的能力，简化企业的 DevOps 工作流。KubeSphere 提供了运维友好的向导式操作界面，帮助企业快速构建一个强大和功能丰富的容器云平台。2020年6月30日，青云QingCloud正式推出KubeSphere 3.0。KubeSphere是以Kubernetes为基础，管理云原生应用的一种分布式操作系统。它提供可插拔的开放式架构，可以很方便地与云原生生态进行即插即用（plug-and-play）的集成，让第三方应用可以无缝对接进来，让用户使用KubeSphere第三方应用，同时也跟KubeSphere原生应用一样，使用起来非常平滑。
  目前，KubeSphere适配了大部分主流的云平台和容器平台，如阿里云、[AWS](https://so.csdn.net/so/search?q=AWS&spm=1001.2101.3001.7020)、腾讯云，自己的青云QingCloud；容器平台如OpenShift、Rancher等。它也是CNCF的一员；KubeSphere 旨在解决 Kubernetes 在构建、部署、管理和可观测性等方面的痛点，提供全面的服务和自动化的应用供应、伸缩和管理，让研发更专注于代码编写。
![2](.\images\2.png)
kubersphere也是一个灵活的轻量级容器 PaaS 平台； 对不同云生态系统的支持非常友好，对原生 Kubernetes 本身**无任何的侵入 (Hack)**。即KubeSphere 可以部署并运行在任何基础架构以及所有版本兼容的 Kubernetes 集群之上，包括虚拟机、物理机、数据中心、公有云和混合云等。



## 二、架构

#### 2.1 k8s架构:C/S架构

![3](.\images\3.png)
![4](.\images\4.png)
![5](.\images\5.png)

![6](.\images\6.png)

> 核心层：Kubernetes 最核心的功能，对外提供 API 构建高层的应用，对内提供插件式应用执行环境；
> 应用层：部署（无状态应用、有状态应用、批处理任务、集群应用等）和路由（服务发现、DNS 解析等）、Service Mesh（部分位于应用层）；
> 管理层：系统度量（如基础设施、容器和网络的度量），自动化（如自动扩展、动态 Provision 等）以及策略管理（RBAC、Quota、PSP、NetworkPolicy 等）、Service Mesh（部分位于管理层）；
> 接口层：kubectl 命令行工具、客户端 SDK 以及集群联邦；
> 生态系统：在接口层之上的庞大容器集群管理调度的生态系统，可以划分为两个范畴；
>   Kubernetes 外部：日志、监控、配置管理、CI/CD、Workflow、FaaS、OTS 应用、ChatOps、GitOps、SecOps 等;
>   Kubernetes 内部：CRI、CNI、CSI、镜像仓库、Cloud Provider、集群自身的配置和管理等;

![7](.\images\7.png)

![8](.\images\8.png)

#### K8S工作流程：

![9](.\images\9.png)
![10](.\images\10.png)

Pod创建时序图：
![11](.\images\11.png)

##### kubeproxy：

为Service提供cluster内部的服务发现和负载均衡。

它运行在集群各个主机上管理网络通信，服务发现，负载均衡（使用轮询调度算法将请求发送到集群中的多个实例）；当有数据发送到主机时，其将路由到正确的pod或容器；对于主机上发出的数据，基于请求地址发现远程服务器并将数据正确路由；
![12](.\images\12.png)

##### Api Server的工作流程：

提供了资源操作的唯一入口，并提供认证、授权、访问控制、API 注册和发现等机制；
![13](.\images\13.png)

##### Controller的工作流程：

负责维护集群的状态，比如故障检测、自动扩展、滚动更新等；
![14](.\images\14.png)

#### 2.2 kubersphere生态及架构

![15](.\images\15.png)
![16](.\images\16.png)
KubeSphere 将 前端 与 后端 分开，实现了面向云原生的设计，后端的各个功能组件可通过 [REST API](https://kubesphere.com.cn/docs/reference/api-docs/) 对接外部系统。KubeSphere 无底层的基础设施依赖，可以运行在任何 Kubernetes、私有云、公有云、VM 或物理环境（BM）之上。 此外，它可以部署在任何 Kubernetes 发行版上。

##### 软件架构：

![17](.\images\17.png)

##### kube-API架构：

KubeSphere 把用户对原生 Kubernetes 资源的请求通过 API Server 转发到 Kubernetes API Server 对原生资源进行操作和管理。
![18](.\images\18.png)
架构组件说明参看：[官方文档](https://kubesphere.com.cn/docs/introduction/architecture/)和[kubersphere组件](https://kubesphere.com.cn/docs/pluggable-components/overview/)；

##### 平台预览：

![19](.\images\19.png)
![20](.\images\20.png)
![21](.\images\21.png)
![22](.\images\22.png)

![23](.\images\23.png)