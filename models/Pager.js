/**
 * 获得页码索引
 * pageInfo:分页实体
 * viewIndex:可见页数
 */
function Pager (p){
	this.firstIndex = p.first;
	this.lastIndex = p.last;
	this.pageInfo = p.pageInfo;
	this.pageNo = p.pageNo;
	this.pageSize = p.pageSize;
}

module.exports = Pager;

var viewIndex = 6;
/**
 * 获得分页实体
 */
Pager.getPager = function (pageInfo){
	var first = ((pageInfo.current<=viewIndex/2+1)?1:(pageInfo.current-viewIndex/2));
	var last = (first+viewIndex-1>=pageInfo.countPage?pageInfo.countPage:first+viewIndex-1);
	
	return new Pager({first:first, last:last, pageInfo:pageInfo});
}
/**
 * 生成分页url
 */
Pager.generateUrl = function (req){
	var req_url = '';
	if(req.headers.url){
		req_url = req.headers.url;
		if(req_url.spilt('?').length > 1){
			req_url += '&page=';
		}
	}
	return req_url += '?page=';
}

