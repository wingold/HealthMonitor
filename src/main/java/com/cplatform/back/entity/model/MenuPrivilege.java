package com.cplatform.back.entity.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.util.StringUtils;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * @author wu
 * @date 2019/2/25
 */
@Getter
@Setter
public class MenuPrivilege implements Serializable {
    // 菜单代码
    private String menuCode;

    // 该模块下的按钮权限
    private Set<String> buttons;

    public MenuPrivilege() {

    }

    public MenuPrivilege(String menuCode) {
        this.menuCode = menuCode;
    }

    public MenuPrivilege(String menuCode, String buttons) {
        this.menuCode = menuCode;
        if (StringUtils.hasText(buttons)) {
            this.buttons = new HashSet<>();
            String[] bts = buttons.split("#");

            for (String bt : bts) {
                if (StringUtils.hasText(bt)) {
                    this.buttons.add(bt);
                }
            }
        }
    }

    public MenuPrivilege(String menuCode, Set<String> buttons) {
        this.menuCode = menuCode;
        this.buttons = buttons;
    }
}
