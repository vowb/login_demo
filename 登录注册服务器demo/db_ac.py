#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import sqlite3,os

#设置工作目录
os.chdir(os.path.dirname(__file__))


#数据库连接
class db_connect:
	def __queryAll__(self):
		re = self.c.execute("select * from "+self.tableName)
		self.db.commit()
		print(re.fetchall())
		return re.fetchall()
	def __init__(self,sql,table_name,database_name="pythonTest"):
		#设置sqlite文件的读取方式，规避线程的冲突问题
		self.db = sqlite3.connect("./database/"+database_name+".db",check_same_thread=False)
		self.c=self.db.cursor()
		self.c.execute("create table if not exists "+table_name+"("+"".join(str(sql)[1:-1].split("\'"))+")")
		self.tablehead = tuple(sql)
		self.tableName = table_name
		self.queryAll = self.__queryAll__	#可以加上括号以保证queryAll是一个属性，也可以不加，看自己喜欢那个

	def insert(self,*args):
		self.c.execute("insert into "+self.tableName+" values(null,"+str(list(args))[1:-1]+")")
		self.db.commit()
		self.queryAll()
	def delete(self,key,value):
		print("delete from "+self.tableName+" where "+key+"="+value)
		self.c.execute("delete from "+self.tableName+" where "+key+"=\'"+value+"\'")
		self.db.commit()
		self.queryAll()
	def update(self,col_key,col_val,**kw):
		for x,y in kw.items():
			self.c.execute("update "+self.tableName+" set "+x+"="+y+" where "+col_key+"=\'"+col_val+"\'")
			self.db.commit()
		self.queryAll()
	def query(self,row_key,**kw):
		relist = []
		for x,y in kw.items():
			re = self.c.execute("select "+row_key+" from "+self.tableName+" where "+x+"="+str(y))
			relist.append(re.fetchone())
			self.db.commit()
		self.queryAll()
		return relist

	#def __exit__(self):
