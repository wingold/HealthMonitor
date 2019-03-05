package com.cplatform.tag;

import com.cplatform.back.service.MenuService;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import javax.servlet.http.HttpSession;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.TagSupport;

@SuppressWarnings("serial")
public class ModelBtnTag extends TagSupport {

	private String btn;

	private String model;

	private boolean reverse = false;

	@Override
	public int doStartTag() throws JspException {


        ApplicationContext ctx = WebApplicationContextUtils.getWebApplicationContext(pageContext.getServletContext());
        MenuService menuService = ctx.getBean(MenuService.class);

        HttpSession session = pageContext.getSession();
        boolean re = menuService.hasButton(session, model, btn);
        re = reverse ? !re : re;
        return re ? EVAL_BODY_INCLUDE : SKIP_BODY;
    }

	@Override
	public void release() {
        super.release();
		btn = null;
		model = null;
	}

	public String getBtn() {
		return btn;
	}

	public String getModel() {
		return model;
	}

	public void setBtn(String btn) {
		this.btn = btn;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public boolean isReverse() {
		return reverse;
	}

	public void setReverse(boolean reverse) {
		this.reverse = reverse;
	}

}
