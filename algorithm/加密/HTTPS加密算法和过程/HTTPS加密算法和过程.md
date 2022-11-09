# HTTPS加密算法和过程



### 1. HTTP三大风险

- 1） 窃听风险：黑客可以获取通信内容

- 2）篡改风险：黑客可以修改通信信息

- 3）冒充风险：黑客可以冒充他人身份和通信

  ![1](.\images\1.png)

### 2. HTTPS

HTTP

![2](.\images\2.png)

### 3.加密算法

#### 3.1对称加密AES

- 加密和解密使用同一个密钥

  ![3](.\images\3.png)

#### 3.2 非对称加密

![4](.\images\4.png)

#### 3.3 哈希算法

先算出摘要（hash值），对称进行签名，直接签名的话性能差

哈希函数的作用是给一个任意长度的数据生成一个固定长度的数据

- 安全性：可以从给定的数据X计算出哈希值Y，但不能从哈希值Y计算数据X

- 独一无二 不同的数据一定会产出不同的哈希值

- 长度固定 不管输入多大的数据 输出的长度都是固定的

  ![5](.\images\5.png)

#### 3.4 签名

- 数字签名的基本原理就是用私钥去签名，而用公钥去验证签名

  ![6](.\images\6.png)

  ![7](.\images\7.png)

#### 3.5 数字证书

- 数字证书是一个由可信的第三方发出的，用来证明所有人身份以及所有人拥有某个公钥的电子文件

  

- ![8](.\images\8.png)

#### 3.6 密钥交换算法

- Diffe-Hellman【赫尔曼算法】算法是一种密钥交换协议（交换方式rha和ecc），它可以让双方在不泄露的情况下协商出一个密钥来

  ![9](.\images\9.png)

#### 3.7 ECC 是现实Diffe-Hellman（密钥交换）的一种算法

- 椭圆曲线加密算法（ECC）是基于椭圆曲线数学的一种加密的算法
- 另外搜索公众号技术社区后台回复“壁纸”，获取一份惊喜礼包。

```
//这是简化模拟的过程
let basic = 3;//共享basic
let a = 5;
let basicA = basic*a;//15
let b = 7;
let basicB = basic*b;//21

console.log(a*basicB);//105
console.log(b*basicA);//105
```



![10](.\images\10.png)

### 4. 加密过程

![11](.\images\11.png)

#### 4.1 ClientHello

在一次新的握手流程中，客户端先发送ClientHello

- Version 协议版本

- Random 包含32个字节的随机数 28随机数字节+4字节时间戳,随机数是为了保证每一次连接者是独立无二的

- Cipher Suites 客户端支持的所有密码套件

- Extensions 扩展的额外数据

  ![12](.\images\12.png)

#### 4.2 ServerHello

- 将服务器选择的连接参数发回给客户端，消息结构和ClientHello类似 ，每个字段只包含一个选项

  ![13](.\images\13.png)

#### 4.3 Certificate

- Certificate消息发送X.509证书

  ![14](.\images\14.png)

#### 4.5 Server Hello Done

- ClientKeyExchange消息携带客户端为密钥交换的所有信息

  ![15](.\images\15.png)

#### 4.6 ClientKeyExchange 

- ClientKeyExchange消息携带客户端为密钥交换的所有信息

  ![16](.\images\16.png)

#### 4.7 ChangeCipherSpec

- ChangeCipherSpec表示客户端已经得到了连接参数的足够信息，已生成加密密钥，并切换到了加密模式

  ![17](.\images\17.png)

#### 4.8 EncryptedHandshakeMessage 

- 这个报文的目的就是告诉对端自己在整个握手过程中收到了什么数据，发送了什么数据,来保证中间没人篡改报文
- 其次这个报文作用就是确认秘钥的正确性。因为Encrypted handshake message是使用对称秘钥进行加密的第一个报文，如果这个报文加解密校验成功，那么就说明对称秘钥是正确的
- 计算方法就将之前所有的握手数据(包括接受和发送)计算哈希运算,然后就是使用协商好的对称密钥进行加密
- 加密(SHA(客户端随机数+服务器随机数))
- ![18](.\images\18.jpg)

#### 4.9 New Session Ticket

- SSL 中的 session 会跟 HTTP 的 session 类似,都是用来保存客户端和服务端之间交互的一些记录
- 如果服务端允许使用 Session ID,客户端的 Client Hello 带上 Session ID，服务端复用 Session ID 后，会直接略过协商加密密钥的过程，直接发出一个 Change Cipher Spec 报文,然后就是加密的握手信息报文
- 在服务器发送New Session Ticket消息
- Type 类型
- Version 版本
- Length长度
- Session Ticket Lifetime Hint 表示Ticket的剩余有效时间
- Session Ticket 会话标识

![19](.\images\19.png)

![20](.\images\20.png)