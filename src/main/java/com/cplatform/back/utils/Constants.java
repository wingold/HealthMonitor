package com.cplatform.back.utils;

import java.util.HashMap;
import java.util.Map;

/**
 * Title.常量类 <br>
 * Description.
 * <p>
 * Copyright: Copyright (c) 2013-7-18 下午05:26:22
 * <p>
 * Company: 北京宽连十方数字技术有限公司
 * <p>
 * Author: macl@c-platform.com
 * <p>
 * Version: 1.0
 * <p>
 */
public class Constants {

	/** 调用页面静态化接口失败 **/
	public static final String STATIC_FAIL = "调用页面静态化接口失败";

	/** 调用商户生成门店失败 **/
	public static final String STORE_STATIC_FAIL = "调生成商户门店接口失败";

	/** 查询返回页面url session key */
	public static final String QUERY_BACK_URL = "QUERY_BACK_URL";

	public static final String REQUEST_BACK_URL = "queryBackUrl";

	public static final String JS_AREA_CODE = "320000";

	/** 商户费率的清算类别：C-按照商品类别结算 **/
	public static final String STORE_FEE_CLEAR_TYPE_C = "C";

	/** 商户费率的清算类别：P-按照商品结算 **/
	public static final String STORE_FEE_CLEAR_TYPE_P = "P";

	/*** 合同类别 **/
	public static final String CONTRACT_TYPE = "02";

	/*** 礼品卡命名固定长度 **/
	public static final int CHECK_GIFT_CARD_LENGTH = 19;

	/** ftp地址 **/
	// public static final String FTP_SERVER_IP="211.138.195.127";

	/** ftp端口号 **/
	// public static final String FTP_SERVER_PORT="8821";

	/** ftp用户名 **/
	// public static final String FTP_USER="qjscontracts";

	/** ftp密码 **/
	// public static final String FTP_PASSWD="upPWD2763";

	/** ftp目录 **/
	// public static final String FTP_REMOTEPATH="/";

	/** 扩展名集合 **/
	public static final String EXTNAME = "rar,zip,pdf,txt,docx,xlsx,csv,bmp,gif,jpg,pic,png,tif";

	/** 礼品卡 -激活状态 */
	// 礼品卡异常
	public static final Long GIFTCARD_STATUS_EXCEPTION = (long) -1;

	// 礼品卡待激活
	public static final Long GIFTCARD_STATUS_STAY = (long) 0;

	// 礼品卡激活
	public static final Long GIFTCARD_STATUS_ACTIVATE = (long) 1;

	// 礼品卡冻结
	public static final Long GIFTCARD_STATUS_BLOCK = (long) 2;

	// 礼品卡挂失
	public static final Long GIFTCARD_STATUS_LOSS = (long) 3;

	/** 冻结、挂失、解挂 验证消息 */
	// 此卡不存在
	public static final String MESSAGE_GIFTCARD_HAVENO = "此卡不存在，请重新输入";

	// 此卡已失效
	public static final String MESSAGE_GIFTCARD_EXPIRY = "此卡已失效";

	// 调用接口失败
	public static final String MESSAGE_GIFTCARD_INTERFACE = "调用接口出错";

	/** 无锡68推荐商品默认积点数 */
	public static final int WXPOINT = 0;

	public static final Map<String, String> CITY_MAP = new HashMap<String, String>();
	static {
		CITY_MAP.put("320100", "250");
		CITY_MAP.put("320200", "510");
		CITY_MAP.put("320300", "516");
		CITY_MAP.put("320400", "519");
		CITY_MAP.put("320500", "512");
		CITY_MAP.put("320600", "513");
		CITY_MAP.put("320700", "518");
		CITY_MAP.put("320800", "517");
		CITY_MAP.put("320900", "515");
		CITY_MAP.put("321000", "514");
		CITY_MAP.put("321100", "511");
		CITY_MAP.put("321200", "523");
		CITY_MAP.put("321300", "527");
	}

	public static final Map<String, String> PROVINCE_MAP = new HashMap<String, String>();

	static {
		PROVINCE_MAP.put("320000", "10");
	}

	public static Map<Long, Long> BILLING_MODE_MAP = null;
	static {
		BILLING_MODE_MAP = new HashMap<Long, Long>();
		BILLING_MODE_MAP.put(1L, 2L);
		BILLING_MODE_MAP.put(2L, 1L);
	}
}
