define({ "api": [
  {
    "type": "post",
    "url": "/template/update_chanel",
    "title": "删除栏目",
    "name": "del_chanel",
    "group": "chanel",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>栏目id,必填</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"id\": 4711\n}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>消息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>状态码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"msg\": \"删除成功\",\n  \"code\": 200\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/chanel.js",
    "groupTitle": "chanel"
  },
  {
    "type": "post",
    "url": "/template/get_chanel",
    "title": "获取栏目",
    "name": "get_chanel",
    "group": "chanel",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>栏目id,必填</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"id\": 4711\n}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>消息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>状态码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"msg\": \"获取成功\",\n  \"code\": 200,\n  \"data\": {...}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/chanel.js",
    "groupTitle": "chanel"
  },
  {
    "type": "post",
    "url": "/template/list_chanel",
    "title": "栏目列表",
    "name": "list_chanel",
    "group": "chanel",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>消息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>状态码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"msg\": \"查询成功\",\n  \"code\": 200,\n  \"data\": [...]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/chanel.js",
    "groupTitle": "chanel"
  },
  {
    "type": "post",
    "url": "/template/save_chanel",
    "title": "更新栏目",
    "name": "save_chanel",
    "group": "chanel",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>栏目内容,必填</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"id\": 4711,\n  \"data\": {\n     template: '/default/index.ejs',\n     name: 'newName'\n  }\n}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>消息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>状态码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"msg\": \"添加成功\",\n  \"code\": 200\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/chanel.js",
    "groupTitle": "chanel"
  },
  {
    "type": "post",
    "url": "/template/update_chanel",
    "title": "更新栏目",
    "name": "update_chanel",
    "group": "chanel",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>栏目id,必填</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>栏目更新内容,必填</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"id\": 4711,\n  \"data\": {\n     template: '/default/index.ejs',\n     name: 'newName'\n  }\n}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>消息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>状态码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"msg\": \"更新成功\",\n  \"code\": 200\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/chanel.js",
    "groupTitle": "chanel"
  },
  {
    "type": "post",
    "url": "/template/del_template",
    "title": "删除模板",
    "name": "del_template",
    "group": "template",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "path",
            "description": "<p>模板路径,必填</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>消息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>状态码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"msg\": \"删除成功\",\n  \"code\": 200\n}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 503 Access Denied\n{\n  \"error\": \"access denied\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/template.js",
    "groupTitle": "template"
  },
  {
    "type": "post",
    "url": "/template/get_template",
    "title": "获取模板",
    "name": "get_template",
    "group": "template",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "path",
            "description": "<p>模板路径,必填</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>消息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>状态码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"msg\": \"查询成功\",\n  \"code\": 200,\n  \"data\": [{\n        name: 'index.ejs',\n        path: '/default',\n        content: ''\n  }]\n}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "api/template.js",
    "groupTitle": "template"
  },
  {
    "type": "post",
    "url": "/template/list_template",
    "title": "模板列表",
    "name": "list_template",
    "group": "template",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>消息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>状态码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"msg\": \"查询成功\",\n  \"code\": 200,\n  \"data\": [{\n        name: 'index.ejs',\n        path: '/default'\n  }]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/template.js",
    "groupTitle": "template"
  },
  {
    "type": "post",
    "url": "/template/save_template",
    "title": "添加模板",
    "name": "save_template",
    "group": "template",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "path",
            "description": "<p>模板路径,必填</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>模板名称,必填</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>模板内容,必填</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"path\": '/default',\n  \"name\": 'index.ejs',\n  \"content\": ''\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>消息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>状态码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"msg\": \"添加成功\",\n  \"code\": 200\n}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "api/template.js",
    "groupTitle": "template"
  },
  {
    "type": "post",
    "url": "/template/update_template",
    "title": "更新模板",
    "name": "update_template",
    "group": "template",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "path",
            "description": "<p>模板路径,必填</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>模板内容,必填</p>"
          }
        ]
      }
    },
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>消息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>状态码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"msg\": \"更新成功\",\n  \"code\": 200\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/template.js",
    "groupTitle": "template"
  }
] });
