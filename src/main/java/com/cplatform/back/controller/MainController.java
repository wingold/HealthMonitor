package com.cplatform.back.controller;

import com.cplatform.back.entity.SysUser;
import com.cplatform.back.entity.model.SessionUser;
import com.cplatform.back.mapper.MenuMapper;
import com.cplatform.back.mapper.SysUserMapper;
import org.jasig.cas.client.authentication.AttributePrincipalImpl;
import org.jasig.cas.client.util.AbstractCasFilter;
import org.jasig.cas.client.validation.Assertion;
import org.jasig.cas.client.validation.AssertionImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.WebRequest;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

/**
 * @author wu
 * @date 2019/2/26
 */
@Controller
@RequestMapping("/")
public class MainController {

    @Autowired
    SysUserMapper sysUserMapper;

    @Autowired
    MenuMapper menuMapper;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public String home(Model model, HttpSession session) {
        // 模拟登录开启
//        if (appConfig.isFackLogin()) {
            // 判断本地是否登录。
            if (session.getAttribute(SessionUser.SESSION_USER_KEY) == null)
                return "menu/fack-login-form";
//        }
        return "redirect:/menu";

    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public String fakeLogin(String username, HttpSession session) {
//		if (appConfig.isFackLogin()) {
//			fackLogin(session, username);
//		}

        return "redirect:/menu";
    }

    @RequestMapping(value = "info/{status}")
    public String info(@PathVariable String status, Model model) {
        model.addAttribute("status", status);
        return "info";
    }

    @RequestMapping("user/role")
    @ResponseBody
    public String role() {
        return "ok";
    }

    @RequestMapping("logout")
    public String logout(HttpServletRequest request) {
        // invalidate session local and sso server also send sso logout request;
        request.getSession().invalidate();

        /**
         * 因为invalidate方法不是真正的将session销毁，只是将session中的内容清空，
         * 所以当invalidate以后再新建session，新建的session其实不是新的，是将之前的session重新启用了。
         * 于是session的id不变。只有cookie失效掉，才能换成新的session id
         */
        if (request.getCookies() != null) {
            Cookie[] cookies = request.getCookies();
            for (int i = 0; i < cookies.length; i++) {
                if (cookies[i].getName().toUpperCase().equals("JSESSIONID"))
                    cookies[i].setMaxAge(0); // 让JSESSIONID 的cookie过期
            }
        }

        // 登出跳转需使用sso 服务器的链接。带service参数表示登出后跳转地址。
//        return "redirect:" + appConfig.getSsoServer() + "/logout?service=" + appConfig.getSsoClient() + request.getContextPath();
        return "";
    }

    @RequestMapping(value = "/static/global.js", produces = { "application/x-javascript", "text/javascript", "application/javascript" })
    @ResponseBody
    public String jsGlobal(WebRequest webRequest) {
        StringBuilder sb = new StringBuilder();
        sb.append("var G_CTX_ROOT = '").append(webRequest.getContextPath()).append("';\n");
//        sb.append("var XH_EXT = '").append(appConfig.getXheditorExt()).append("';\n");
//        sb.append("var XH_IMG_EXT = '").append(appConfig.getXheditorImageExt()).append("';\n");
//        sb.append("var XH_MAXSIZE = '").append(appConfig.getXheditorMaxSize()).append("';\n");
//        sb.append("var XH_DOMAIN = '").append(appConfig.getXheditorDomain()).append("';\n");
        return sb.toString();
    }

    private void fackLogin(HttpSession session, String uid) {
        final String principal = uid;

        if (uid == null) {
            throw new RuntimeException("user code  is null!");
        }

        SysUser user = sysUserMapper.findByUserCode(uid);

        if (user == null) {
            throw new RuntimeException("user name not found!");
        }
        Map<String, Object> attributes = new HashMap<String, Object>();
        attributes.put("ID", user.getId());
        attributes.put("FLAG", user.getFlag());
        attributes.put("EMAIL", user.getEmail());
        attributes.put("USER_NAME", user.getUserName());
        attributes.put("USER_CODE", user.getUserCode());
        attributes.put("STATUS", user.getStatus());
        attributes.put("CHANGE_PWD_TIME", user.getChangePwdTime());
        attributes.put("TERMINAL_ID", user.getTerminalId());
        attributes.put("VALID_TIME", user.getValidTime());

        Assertion assertion = new AssertionImpl(new AttributePrincipalImpl(principal, attributes));

        session.setAttribute(AbstractCasFilter.CONST_CAS_ASSERTION, assertion);
    }
}
