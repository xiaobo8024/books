# rebase和merge区别





![0ff41bd5ad6eddc44f13bf2d4354b7f75066338c](.\images\0ff41bd5ad6eddc44f13bf2d4354b7f75066338c.webp)



merge 和 rebase 的区别：

1.merge 会多出一次 merge commit，rebase不会。

2.merge 的提交树是非线性的，rebase 的提交树是线性的（通过重写提交历史）。



![5d6034a85edf8db18d14be4b69acdc5e564e7404](.\images\5d6034a85edf8db18d14be4b69acdc5e564e7404.webp)



Merge命令会把公共分支和你当前的commit 合并在一起，形成一个新的 commit 提交，其原理是找到这两个分支的祖先commit，在两个分支最新的commit进行三方对比合并。

（尽管这些时间对于程序本身并没有任何意义，但是merge的命令初衷就是为了保留这些时间不被修改。这样也就形成了以merge时间为基准的网状历史结构。每个分支上都会继续保留各自的代码记录, 主分支上只保留merge的历史记录，子分支随时都有可能被删除。）



rebase命令会始终把最新的修改放到最前头，把当前分支的 commit 放到公共分支的最后面，所以叫变基，其原理是重新基于一个分支上进行commit,就是会把当前分支从祖先的commit后提交的commit都撤销掉，放到一个缓存里面去，然后基于一个分支的后面，把缓存的commit再按顺序一个个新增到这个分支后面。

![b58f8c5494eef01fbc68810f8271982fbd317d11](.\images\b58f8c5494eef01fbc68810f8271982fbd317d11.webp)



资料扩展

merge和rebase的使用场景：

rebase：自己开发分支一直在做,然后某一天想把主线的修改合到分支上,做一次集成,这种情况就用rebase比较好

分支使用rebase，因为往后放的这些 commit 都是新的,这样其他从这个公共分支拉出去的分支都需要再 rebase,相当于你 rebase 东西进来，就都是新的 commit 了。