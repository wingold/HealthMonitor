package com.cplatform.back.service;

import com.cplatform.back.entity.SysMenu;
import com.cplatform.back.entity.SysRolePrivilege;
import com.cplatform.back.entity.SysUser;
import com.cplatform.back.entity.model.MenuPrivilege;
import com.cplatform.back.entity.model.SessionUser;
import com.cplatform.back.mapper.MenuMapper;
import com.cplatform.back.mapper.SysRolePrivilegeMapper;
import com.cplatform.back.mapper.SysUserMapper;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.springframework.util.StringUtils;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.util.*;

/**
 * @author wu
 * @date 2019/2/25
 */
@Service
public class MenuService {

    private static final Log logger = LogFactory.getLog(MenuService.class);

    private List<SysMenu> menuList = new ArrayList<SysMenu>();

    private final Map<String, SysMenu> menuMap = new HashMap<String, SysMenu>();

    private final Map<String, String> modelMap = new HashMap<String, String>();

    private String tmpPath;

    private static final String prefxPath = "mall_history";

    @Autowired
    MenuMapper menuMapper;

    @Autowired
    SysUserMapper sysUserMapper;

    @Autowired
    SysRolePrivilegeMapper sysRolePrivilegeMapper;

    @PostConstruct
    private void init(){
        menuList = menuMapper.findAllSysMenu();
        for (SysMenu menu : menuList) {
            menuMap.put(menu.getMenuCode(), menu);
            modelMap.put(menu.getModelCode(), menu.getMenuCode());
        }
        tmpPath = System.getProperty("java.io.tmpdir");
        File dir = new File(FilenameUtils.concat(tmpPath, "mall_history"));
        if (!dir.exists()) {
            dir.mkdirs();
        }
    }

    public synchronized void reloadMenuData() {
        menuMap.clear();
        menuList.clear();
        modelMap.clear();
        init();
    }

    public List<SysMenu> allMenuList() {
        return menuList;
    }

    public Map<String, SysMenu> allMenuMap() {
        return menuMap;
    }

    /**
     * 向已存在的权限菜单Map中添加一个菜单
     *
     * @param map
     *            已存在的权限菜单Map, key为菜单编码, value为PrivilegeMenu对象
     * @param menuCode
     *            要增加的菜单代码
     * @param buttons
     *            要增加的以逗号分隔的按钮权限
     */
    public static void addMenu(Map<String, MenuPrivilege> map, String menuCode, String buttons) {
        if (map == null) {
            map = new HashMap<String, MenuPrivilege>();
        }

        // 如果已存在菜单，需要额外附加buttons按钮
        if (map.containsKey(menuCode)) {

            // 如果没有要添加的按钮权限，直接返回
            if (!StringUtils.hasText(buttons)) {
                return;
            }

            // 更新权限中的buttons
            MenuPrivilege menu = map.get(menuCode);
            String[] bts = buttons.split("#");
            Set<String> sbt = menu.getButtons();
            if (sbt == null) {
                sbt = new HashSet<String>();
            }
            for (String bt : bts) {
                if (StringUtils.hasText(bt)) {
                    sbt.add(bt);
                }
            }
        } else { // 如果不存在则新增至map
            map.put(menuCode, new MenuPrivilege(menuCode, buttons));
        }
    }

    public Map<String, MenuPrivilege> loadUserPrivilege(Long userId) {
        SysUser user = sysUserMapper.findById(userId);
        Map<String, MenuPrivilege> ret = new HashMap<String, MenuPrivilege>();
        // 超级管理员不用加入权限。默认为全部权限
        if (SysUser.USER_TYPE_MASTER == user.getFlag()) {
            return null;
        }

        // 查询出权限并添加
        List<SysRolePrivilege> priviletList = sysRolePrivilegeMapper.findByUserRolePrivilege(userId);
        for (SysRolePrivilege rp : priviletList) {
            ret.put(rp.getMenuCode(), new MenuPrivilege(rp.getMenuCode(), rp.getMenuBtn()));
        }
        return ret;
    }

    /**
     * 从HttpSession中获取用户权限列表
     *
     * @param session
     *            HttpSession
     * @return 登录用户拥有的菜单、权限的Map
     */
    public Map<String, MenuPrivilege> getPrivilege(HttpSession session) {
        SessionUser sessionUser = (SessionUser) session.getAttribute(SessionUser.SESSION_USER_KEY);
        Assert.notNull(sessionUser, "user information in session cannot be null");
        return sessionUser.getPrivilege();
    }

    /**
     * 查找用户是否有某个按钮的权限
     *
     * @param session
     *            HttpSession
     * @param modelCode
     *            菜单的模块名
     * @param button
     *            本页面的按钮名
     * @return 是否有权限
     */
    public boolean hasButton(HttpSession session, String modelCode, String button) {

        SessionUser sessionUser = (SessionUser) session.getAttribute(SessionUser.SESSION_USER_KEY);

        if (sessionUser == null) {
            return false;
        }

        // 超级管理员
        if (SysUser.USER_TYPE_MASTER == sessionUser.getUserType()) {
            return true;
        }

        // 取出权限map
        Map<String, MenuPrivilege> map = sessionUser.getPrivilege();

        // 如果权限为空直接返回false
        if (map == null) {
            return false;
        }

        // 循环检查权限map元素
        Collection<MenuPrivilege> privileges = map.values();
        for (MenuPrivilege menu : privileges) {

            // 找到对应的model code项，查找是否存在button
            SysMenu item = menuMap.get(menu.getMenuCode());
            String mCode = (menu == null ? "" : item == null ? "" : item.getModelCode());

            if (modelCode.equals(mCode)) {
                Set<String> sbt = menu.getButtons();
                if (sbt != null) {
                    return sbt.contains(button);
                }
                break;
            }
        }
        return false;
    }

    /**
     * 从session加载用户拥有的菜单列表
     *
     * @param session
     *            HttpSession
     * @return 菜单列表
     */
    public List<SysMenu> menusOfUser(HttpSession session) {
        SessionUser sessionUser = (SessionUser) session.getAttribute(SessionUser.SESSION_USER_KEY);

        Assert.notNull(sessionUser, "user information in session cannot be null");

        // 超级管理员
        if (SysUser.USER_TYPE_MASTER == sessionUser.getUserType()) {
            return menuList;
        }

        // 其他普通用户
        Map<String, MenuPrivilege> menus = sessionUser.getPrivilege();

        // 如果没有权限菜单，返回空
        if (menus == null || menus.size() == 0) {
            return new ArrayList<SysMenu>();
        }

        List<SysMenu> result = new ArrayList<SysMenu>();
        for (SysMenu sysMenu : menuList) {
            if (menus.containsKey(sysMenu.getMenuCode())) {
                result.add(sysMenu);
            }
        }
        return result;
    }

    /**
     * 从物理存储中得到某用户的菜单点击历史记录
     *
     * @param userId
     *            用户id
     * @return 历史记录 Map<#菜单代码#, #点击次数#>
     * @throws Exception
     */
    private Map<String, Long> getHistoryData(Long userId) {
        File file = new File(FilenameUtils.concat(tmpPath, prefxPath) + "/" + userId);
        if (file.exists()) {
            ObjectInputStream ois = null;
            InputStream is = null;
            try {
                is = new FileInputStream(file);
                ois = new ObjectInputStream(is);
                return (Map<String, Long>) ois.readObject();
            }
            catch (Exception ex) {
                // throw ex;
                logger.error(ex.getMessage());
                return new HashMap<String, Long>();
            }
            finally {
                IOUtils.closeQuietly(ois);
                IOUtils.closeQuietly(is);
            }
        } else {
            return new HashMap<String, Long>();
        }
    }

    /**
     * 添加菜单点击记录到物理存储
     *
     * @param userId
     *            用户id
     * @param menuCode
     *            菜单代码
     */
    public synchronized void addData(Long userId, String menuCode) {
        try {
            Map<String, Long> map = getHistoryData(userId);

            if (map.containsKey(menuCode)) {
                map.put(menuCode, map.get(menuCode) + 1);
            } else {
                map.put(menuCode, 1L);
            }

            ObjectOutputStream oos = null;
            OutputStream os = null;
            try {
                os = new FileOutputStream(FilenameUtils.concat(tmpPath, prefxPath) + "/" + userId);
                oos = new ObjectOutputStream(os);
                oos.writeObject(map);
            }
            catch (Exception e) {
                throw e;
            }
            finally {
                IOUtils.closeQuietly(oos);
                IOUtils.closeQuietly(os);
            }
        }
        catch (Exception ex) {
            logger.debug(ex.getMessage(), ex);
        }
    }

    /**
     * 清空菜单点击历史记录
     *
     * @param userId
     *            用户id
     */
    public synchronized void clearData(Long userId) {
        File file = new File(FilenameUtils.concat(tmpPath, prefxPath) + "/" + userId);
        if (file.exists()) {
            file.delete();
        }
    }

    /**
     * 从物理存储中得到排序后的菜单点击历史记录,点击次数高的排列在前
     *
     * @param userId
     *            用户id
     * @return 有序历史记录 List(#菜单代码#, #点击次数#)
     */
    public List<Map.Entry<String, Long>> getSortedData(Long userId) {
        try {
            Map<String, Long> map = getHistoryData(userId);

            List<Map.Entry<String, Long>> list = new ArrayList<Map.Entry<String, Long>>(map.entrySet());
            Collections.sort(list, new Comparator() {

                @Override
                public int compare(Object o1, Object o2) {
                    Map.Entry obj1 = (Map.Entry) o1;
                    Map.Entry obj2 = (Map.Entry) o2;
                    return ((Long) obj2.getValue()).compareTo((Long) obj1.getValue());
                }
            });
            return list;
        }
        catch (Exception ex) {
            logger.debug(ex.getMessage(), ex);
        }
        return null;
    }

    /**
     * 获取指定模块菜单路径名称，形如：系统管理 / 参数管理 /号段配置
     *
     * @param modelCode
     *            模块名
     * @return 加粗连接的菜单路径名称
     */
    public String getPathByModelCode(String modelCode) {
        SysMenu menu = menuMap.get(modelMap.get(modelCode));
        if (menu != null) {
            return String.format("%s → <span style=\" font-weight: bold;\">%s</span>", getPathByMenuCode(menu.getMenuPcode()), menu.getMenuName());
        } else {
            return "";
        }
    }

    /**
     * 递归取菜单名称
     *
     * @param menuCode
     *            菜单编码
     * @return
     */
    private String getPathByMenuCode(String menuCode) {
        StringBuilder result = new StringBuilder();
        SysMenu menu = menuMap.get(menuCode);
        if (menu == null) {
            return result.toString();
        }

        result.append(menu.getMenuName());

        // 根节点
        if (menuCode.equals("0")) {
            return result.toString();
        }
        if (result.length() > 0 && !menu.getMenuPcode().equals("0")) {
            result = result.insert(0, " → ");
        }
        result = result.insert(0, getPathByMenuCode(menu.getMenuPcode()));
        return result.toString();
    }
}
