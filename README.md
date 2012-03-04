[Emailextractor](https://github.com/sixpoint/emailextractor/raw/master/emailextractor.xpi)
Introduction:
-------------
[Emailextractor](https://github.com/sixpoint/emailextractor/raw/master/emailextractor.xpi) 是 Firefox 浏览器的插件, 安装Firefox浏览器和 Emailextractor 之后, 可以较为快速的采集到某些指定网站的作者姓名和Email, 采集到的作者姓名和Email可以较为方便的用cscanada.co.cc/tools/phpmailer/***.php 来发送.

它可以设置后台的请求URL,动态的将采集到的 Email 和 name 插入数据库,更方便的进行数据的挖掘和使用.

现在能采集的网站为:
-------------------
无需去图书馆的:
艾斯威尔: http://www.elsevier.com/wps/find/journal_browse.cws_home
Springer: http://www.springerlink.com/journals/
需要在图书馆的:
EBSCO
ISTP
EI

使用方法:
---------
1.	安装附件中的FirefoxFirefox, 启动Firefox
2.	菜单上选择 工具>附加组件 (Tools > Add-ons)
 在这里选 从文件安装附加组件 (Install Add-on from file) 然后选择 附件中的emailextractor.xpi 文件, 之后会弹出确认安装的界面, 选择安装. 安装完成后,在firefox 的右下角,会出现一个黄色的小图标:   证明已经安装完成.
3.	以后如果插件升级了, 同样用以上第2第3步进行升级.
4.	打开 上面的能采集的某个网站, 然后按照下面的详细方法进行采集(每个网站各有不同,但是基本操作是一样的, 详细见本文档的下一部分)
5.	在采集后,在插件图标上方右键  单击, 会弹出采集的Email的列表,格式就是一行作者姓名,一行email,一行空行,复制到txt文件中, 在cscanada.co.cc/tools/phpmailer/***.php作为附件上传,就可以直接用群发来发送了.
这个弹出的列表中的内容没有右键菜单, 所以要复制的话,使用 Ctrl+a 全选, Ctrl+c 复制, 然后就可以粘贴到记事本中了.
注意:  在将复制的内容粘贴到记事本中时要注意, 很多作者名称中可能包含法语,西班牙语,俄罗斯语等等非英语字母,如果直接复制到记事本中然后保存时,这些字符很可能就变成了问号?, 显示不出来. 这里的操作步骤如下:
(1)	新建一个文本文档(txt文件), 然后打开它
(2)	菜单中选择 文件>另存为  之后在弹出的界面中选择编码为 UTF-8 格式. 保存 

(3)	之后Ctrl+a Ctrl+c 复制从列表中获得采集的数据,然后粘贴到这个改过格式的 txt文件中, 保存之后,就不会出现问好?了.

(4)	可以将第(2)步修改过UTF-8格式的 txt 文件作为一个模板, 以后有新的内容时, 就把这个模板文件复制一份,把内容复制进去, 这样就不需要每次都另存为 UTF-8了, 免得忘记另存UTF-8 而出现很多的?, 做无用功. 
注意:  右键打开的列表中的内容是永久保存的(除非插件被卸载,或者遇到浏览器非正常关闭的情况), 在关闭网页,关闭浏览器,重启等情况下,是不会丢失的, 下次采集的内容,会接着之前的内容添加进去. 而且不同网站,不同网页,不同期刊采集的也会混在一起(比如艾斯威尔的和springer的)
注意: 有时候这个列表中的内容可能无法Ctrl+a 和Ctrl+c, 那么就关闭浏览器,重启之后就没问题了.

注意: 这个列表中的内容是按照每份期刊的名称排列的, 可能会比较混乱, 如果希望只复制作者姓名和email而忽略期刊名称, 那么就点击该列表顶部的 Hide title 将期刊名隐藏, 方便复制. ( 如果点击 Hide title 不管用, 就重启 Firefox, 再右键插件打开列表, Hide title, Ctrl+a, Ctrl+c 将内容复制)

6.	如果要清空这个列表,重新开始,就在网页空白部分右键, 弹出的菜单中选择 Empty Quota 这一项. 这样,列表中之前采集的内容就会被清空, 就可以继续采集新的内容了.
注意: 在 Empty Quota 之后, 之前采集到的内容就永久删除了,所以记得在清空之前保存有用的信息到记事本中.
注意: 列表中内容采集太多后,会变慢, 所以大约采集100-200 个左右的时候,就保存到记事本中, 然后清空这个列表,再开始其他的搜索. 

不同期刊的详细操作方法:
-----------------------
1.	艾斯威尔: http://www.elsevier.com/wps/find/journal_browse.cws_home 打开艾斯威尔,
 
选择学科分类,然后选择要搜的期刊.
  
会出现如下内容 (每个期刊可能各不相同, 有Recent 和 Most Downloaded 的, Issues 里面一般也会有),
1)	对于只有现在点击 绿色部分的红字 Click Me To Got All Emails, 正常的话,就会看到 下面的文章标题被黑框圈起来,并且变红了, 这就表示插件已经去每个页面搜索可能存在的Email了.  如果有 Most Downloaded 的, 那么还需要点击一下 Most Downloaded, 待下面的文章内容加载更换后, 再点击 Click Me To Got All Emails, 便可以把 Most Downloaded 里面的也搜一遍. 通常这2个里面大约能搜到20个. 
2)	对于有Issues的, 在完成上面的步骤后. 点击 Issues,一般可以看到有一些链接,点击链接 就到类似这个的页面 http://www.sciencedirect.com/science?_ob=PublicationURL&_tockey=%23TOC%235295%232011%23997429980%233317736%23FLA%23&_cdi=5295&_pubType=J&_auth=y&_acct=C000228598&_version=1&_urlVersion=0&_userid=10&md5=4a7459fa38f8055e39e021a0d2cc9a47
  (在图书馆的艾斯威尔数据库,同样是这个格式,所以下面部分的采集过程也同样适用)
 
左侧可以选择期刊, 右侧同样只需要点击 Click Me To Got All Emails 即可.


2.	Springerlink 
进入http://www.springerlink.com/journals/  左侧选择分类, 右侧可以选择期刊.
进去每份期刊后,可以看到类似下面的内容
 
同样点击 Click Me To Got All Emails, 即可自动得到这些文章内的Email



3.	EBSCO ISTP EI 的都是在图书馆通过关键词搜索出来的, 所以可以得到一系列的搜索结果, 同样会有类似 上面两个 的 Click Me To Got All Emails 按钮, 点击即可搜集到Email.
