package com.cplatform.tag;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.TagSupport;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * <p>
 * 格式化显示日期对象的标签
 * </p>
 * 
 * <pre>
 * 例: 
 * source=empty, sfmt=empty, tfmt=empty
 * 输出：""
 * source="20060101122134", sfmt=empty, tfmt=empty
 * 输出：2007-01-01 12:21:34
 * source="20060103122134", sfmt=empty, tfmt="yyyy-MM-dd"
 * 输出：2007-01-03
 * source="2006/02/03", sfmt="yyyy/MM/dd", tfmt="yyyy-MM-dd"
 * 输出：2007-02-03
 * </pre>
 * 
 * 默认值： source="" sfmt="yyyyMMddHHmmss" tfmt="yyyy-MM-dd HH:mm:ss" nullval=""
 * 
 * @author chengyao
 * @date 2007-01-16
 */
@SuppressWarnings("serial")
public class TimeFormatTag extends TagSupport {
	/**
	 * Logger for this class
	 */
	private static final Log logger = LogFactory.getLog(TimeFormatTag.class);

	/**
	 * 源日期对象
	 */
	protected Object source = null;

	/**
	 * 源格式字符串
	 */
	protected String sfmt = null;

	/**
	 * 输出格式字符串
	 */
	protected String tfmt = null;

	/**
	 * 源为null时输出的对象
	 */
	protected Object nullval = null;

	/**
	 * 友好格式化结果
	 */
	protected Boolean friendly = false;

	@Override
	public int doStartTag() throws JspException {
		if (tfmt == null) {
			tfmt = "yyyy-MM-dd HH:mm:ss";
		}
		if (sfmt == null) {
			sfmt = "yyyyMMddHHmmss";
		}

		SimpleDateFormat sdf = new SimpleDateFormat(tfmt);
		String ret = null;
		try {
			if (source == null) {
				ret = (nullval == null) ? "" : nullval.toString();
			} else if (source instanceof String) {
				ret = friendly ? format((String) source) : fmtStr((String) source);
			} else {
				ret = sdf.format(source);
			}
			pageContext.getOut().write(ret);
		} catch (Exception e) {
			if (logger.isDebugEnabled()) {
				logger.debug(e + " - source=" + source + ", sfmt=" + sfmt
						+ ", tfmt=" + tfmt);
			}
		}
		return 0;
	}

	private String fmtStr(String time) throws ParseException {
		SimpleDateFormat parseformat = new SimpleDateFormat(sfmt);
		SimpleDateFormat sdf = new SimpleDateFormat(tfmt);
		return sdf.format(parseformat.parse(time));
	}

	public String format(String time) throws ParseException {
		long minuteMillis = 60 * 1000;
		long hourMillis = 60 * minuteMillis;
		long dayMillis = 24 * hourMillis;

		if (time == null || time.length() != 14)
			return null;
		SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
		Date date = df.parse(time);
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		long diff = Calendar.getInstance().getTimeInMillis()
				- cal.getTimeInMillis();
		if (diff < minuteMillis) {
			return "1分钟内";
		}
		if (diff < hourMillis) {
			return ((diff / minuteMillis)) + "分钟前";
		}
		if (diff < dayMillis) {
			return ((diff / hourMillis)) + "小时前";
		}
		SimpleDateFormat df2 = new SimpleDateFormat("yyyy-MM-dd");
		return df2.format(date);
	}

	@Override
	public void release() {
		super.release();
		source = null;
		sfmt = null;
		tfmt = null;
		nullval = null;
		friendly = null;
	}

	public String getSfmt() {
		return sfmt;
	}

	public void setSfmt(String sfmt) {
		this.sfmt = sfmt;
	}

	public Object getSource() {
		return source;
	}

	public void setSource(Object source) {
		this.source = source;
	}

	public String getTfmt() {
		return tfmt;
	}

	public void setTfmt(String tfmt) {
		this.tfmt = tfmt;
	}

	public Object getNullval() {
		return nullval;
	}

	public void setNullval(Object nullval) {
		this.nullval = nullval;
	}

	public Boolean getFriendly() {
		return friendly;
	}

	public void setFriendly(Boolean friendly) {
		this.friendly = friendly;
	}

}
