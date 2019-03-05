package com.cplatform.tag;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.Tag;
import javax.servlet.jsp.tagext.TagSupport;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * 提供按钮转化的标签实现.
 * @Title. <br>
 * @Description.
 * <p>
 * @Copyright: Copyright (c) Jun 3, 2009 11:43:57 AM
 * <p>
 * @Company: 北京宽连十方数字技术有限公司
 * <p>
 * @Author: JinLei
 * <p>
 * @Version: 1.0
 * <p>
 * @History: 
 * <p>
 */
public class BtnViewTag extends TagSupport {
	private static final long serialVersionUID = 6148706660677824021L;
	
	/**
	 * css 样式
	 */
	protected String style = null;
	
	/**
	 * id 属性, 不自定义留空
	 */
	protected String styleId = null;
	
	/**
	 * name 属性, 不自定义留空
	 */
	protected String name = null;
	
	/**
	 * class 属性, 不自定义留空 
	 */
	protected String styleClass = null;

	/**
	 * 按钮的类型: submit 提交按钮, reset 重置按钮, button 普通按钮, link 链接
	 */
	protected String type = null;
	
	/**
	 * 按钮显示的文字
	 */
	protected String value = null;

	/**
	 * 如果type为link,则此处定义链接地址
	 */
	protected String href = null;

	/**
	 * 如果type为link,则此处定义链接的target
	 */
	protected String target = null; 
	
	/**
	 * 如果type为button,则此处定义执行的javascript函数
	 */
	protected String onclick = null; 
	
	/** 提交默认文字 */
	private static String SUBMIT_TEXT = "提 交";
	
	/** 重置默认文字 */
	private static String RESET_TEXT = "重 置";
	
	/** 查询默认文字 */
	private static String SEARCH_TEXT = "查 询";
	
	@Override
	public int doStartTag() throws JspException {
		
		// 请求
		HttpServletRequest request = (HttpServletRequest)pageContext.getRequest();
		
		Map<String, String> attr = new HashMap<String, String>();
		
		// class, default squarebutton
		attr.put("class", (styleClass==null) ? "btn_blue" : styleClass);
		
		// id
		if (styleId != null) {
			attr.put("id", styleId);
		}
		
		// name
		if (name != null) {
			attr.put("name", name);
		}
		
		// style
		if (style != null) {
			attr.put("style", style);
		}
		
		// anchor type
		if ("link".equalsIgnoreCase(type)) {
			target = (target==null) ? "_self" : target;
			if (href != null) {
				attr.put("href", request.getContextPath() + href);
			}
			attr.put("target", target);
		}
		
		// button type
		if ("button".equalsIgnoreCase(type)) {
			if (onclick != null) {
				attr.put("onclick", onclick);
			}
		}
		
		// submit type
		if ("submit".equalsIgnoreCase(type)) {
			value = (value == null) ? SUBMIT_TEXT : value;
			attr.put("onclick", "document.getElementById('btn-submit').click()");
			attr.put("element", "<input type=\"submit\" style=\"display:none\" id=\"btn-submit\"/>");
		}
		
		// reset type
		if ("reset".equalsIgnoreCase(type)) {
			value = (value == null) ? RESET_TEXT : value;
			attr.put("onclick", "document.getElementById('btn-reset').click()");
			attr.put("element", "<input type=\"reset\" style=\"display:none\" id=\"btn-reset\"/>");
		}
		
		// reset type
		if ("search".equalsIgnoreCase(type)) {
			value = (value == null) ? SEARCH_TEXT : value;
			attr.put("onclick", "document.getElementById('btn-search').click()");
			attr.put("element", "<input type=\"submit\" style=\"display:none\" id=\"btn-search\"/>");
		}
		
		// display value
		attr.put("value", value);
		
		// build tag content
		StringBuilder result = new StringBuilder();
		result.append("<a class=\"");
		result.append(attr.get("class"));
		result.append("\"");
		
		if (attr.containsKey("styleId")) {
			result.append(" id=\"");
			result.append(attr.get("id"));
			result.append("\"");
		}
		
		if (attr.containsKey("name")) {
			result.append(" name=\"");
			result.append(attr.get("name"));
			result.append("\"");
		}
		
		if (attr.containsKey("style")) {
			result.append(" style=\"");
			result.append(attr.get("style"));
			result.append("\"");
		}
		
		result.append(" href=\"");
		result.append((attr.get("href")==null) ? "javascript:;" : attr.get("href"));
		result.append("\"");
		if (attr.containsKey("target")) {
			result.append(" target=\"");
			result.append(attr.get("target"));
			result.append("\"");
		}
		if (attr.containsKey("onclick")) {
			result.append(" onclick=\"");
			result.append(attr.get("onclick"));
			result.append(";return false;\"");
		}
		result.append("><span>");
		result.append(attr.get("value"));
		result.append("</span></a>");
		if (attr.containsKey("element")) {
			result.append(attr.get("element"));
		}
		
		//System.out.println(result.toString());
		
		// write to page
		try {
			pageContext.getOut().write(result.toString());
		} catch (IOException e) {
			// ignore
		}
		return Tag.SKIP_BODY;
	}

	@Override
	public int doEndTag() throws JspException {
		clearValue();
		return super.doEndTag();
	}
	
	@Override
	public void release() {
		super.release();
		clearValue();
	}
	
	/**
	 * 清空变量值, taglib是单实例,所以每次运行完需清空值
	 */
	private void clearValue() {
		styleClass = null;
		type = null;
		value = null;
		href = null;
		onclick = null;
		target = null;
		styleId = null;
		name = null;
		style = null;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getHref() {
		return href;
	}

	public void setHref(String href) {
		this.href = href;
	}

	public String getOnclick() {
		return onclick;
	}

	public void setOnclick(String onclick) {
		this.onclick = onclick;
	}

	public String getTarget() {
		return target;
	}

	public void setTarget(String target) {
		this.target = target;
	}

	public String getStyleId() {
		return styleId;
	}

	public void setStyleId(String styleId) {
		this.styleId = styleId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getStyleClass() {
		return styleClass;
	}

	public void setStyleClass(String styleClass) {
		this.styleClass = styleClass;
	}

	public String getStyle() {
		return style;
	}

	public void setStyle(String style) {
		this.style = style;
	}
}
