/**
 * 获取函数类型的工具函数 小写形式返回
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
function getObjectType(obj){
	return Object.prototype.toString.call(data[selected]).slice(8,-1).toLowerCase();
}