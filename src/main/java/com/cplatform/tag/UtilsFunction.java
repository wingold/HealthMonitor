package com.cplatform.tag;

import org.springframework.web.context.support.WebApplicationContextUtils;

import javax.servlet.ServletContext;

/**
 * Title. <br>
 * Description.
 * <p/>
 * Copyright: Copyright (c) 12-11-12 下午2:15
 * <p/>
 * Company: 北京宽连十方数字技术有限公司
 * <p/>
 * Author: chengyao
 * <p/>
 * Version: 1.0
 * <p/>
 */
public class UtilsFunction {

    public static Object getSpringBean(ServletContext servletContext, String name) {
        return WebApplicationContextUtils.getWebApplicationContext(servletContext).getBean(name);
    }

}
