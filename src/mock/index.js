const Mock = require('mockjs')

import Test from "./data/test"


for(const i of Test){
    Mock.mock(new RegExp(i.url), i.type || 'get',i.data)
}