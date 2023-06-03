文件结构
```
tree
 ┣ back                 后端题目文件夹
 ┃ ┣ copy
 ┃ ┃ ┗ index.js         第三题：copy a large file with progress  
 ┃ ┣ server 
 ┃ ┃ ┗ index.js         第一题：http server
 ┃ ┗ serverWithSchema   
 ┃ ┃ ┗ index.js         第二题：express with graphQl
 ┗ front                    
 ┃ ┗ src 
 ┃ ┃ ┗ app
 ┃ ┃ ┃ ┗ pages
 ┃ ┃ ┃ ┃ ┗ appointments
 ┃ ┃ ┃ ┃ ┃ ┗ index.tsx  前端题：日历的的代码入口文件
```


# 前端题目
### 运行 
```
cd /front
npm install
npm run dev 

```
查看：http://localhost:3000



# 后端题目
## 第一题： Create a http server
### 运行 

```
cd /back/server
node index.js

查看：
http://localhost:8080/parsetime?iso=2023-06-03T16:17:51.538Z
http://localhost:8080/unixtime?iso=2023-06-03T16:17:51.538Z

```



##  第二题： Express with graphql
### 运行 
查看：http://localhost:4000/parsetime
```
cd /back/serverWithSchema
npm install
node index.js
```


query:
```
{
  times(iso: "2023-06-03T11:46:10.856Z"){
    year
    month
    day
    hour
    minute
    second
    unixtime
  }
}
```


##  第三题： Copy a large file with progress
### 运行 
查看：控制台progress。
这里选择了2G的/dev/zero二进制文件输出到copy目录下， 64kb去做一次读取
```
cd /back/copy
node index.js
```