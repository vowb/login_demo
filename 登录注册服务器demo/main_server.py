#!/usr/bin/env python3
# -*- coding: utf-8 -*-


import flask,jinja2,chardet,os,sys,db_ac
from werkzeug import secure_filename

#Create the application
APP = flask.Flask(__name__)
#设置工作目录
os.chdir(os.path.dirname(__file__))
#创建数据库
db_user = db_ac.db_connect(["_id integer primary key autoincrement","username text","password text"],"account")


#首页
@APP.route("/")
def index():
	return flask.render_template("login.html",isdistip=False,title=msg.view_msg,isdis=msg.isdis,in_js="js/login.js",in_css="css/login.css")

#AJAX请求处理
@APP.route("/<page>",methods=["POST"])
def login(page):
	print(page)
	if (page == "login.html") and (len(flask.request.form) != 0) :
		accounts = {}
		for x,y in flask.request.form.items():
			accounts[x] = y
		try:
			if str(db_user.query("username",password=accounts["password"])[0][0]) == accounts["username"] :
				return accounts["username"]
			else:
				return ""
		except TypeError:
			return ""

	elif (page == "signup.html") and (len(flask.request.form) != 0) :
		accounts = {}
		for x,y in flask.request.form.items():
			accounts[x] = y
			print(y)
		try:
			if str(db_user.query("username",password=accounts["password"])[0][0]) == accounts["username"]:
				return ""
		except TypeError:
			db_user.insert(accounts["username"],accounts["password"])
			return "haha"




if __name__=="__main__":
	APP.debug = True
	APP.run()
