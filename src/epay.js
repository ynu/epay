import process from 'node:process';
import axios from 'axios';
import Debug from 'debug';
import {getSignObject} from "./utli.js";

const debug = Debug('epay::debug');

/**
 * 通用卡、账户信息查询-单用户
 * @param {String} stuempno 查询对象的学号
 * @param {Object} options 环境选项
 * @returns
 */
export const singleCardInfo = async (stuempno, options = {}) => {
  options.host = options.host || process.env.EPAY_HOST;
  // 获得签名对象
  const signParams = getSignObject({stuempno: stuempno}, options);
  debug(`${options.host}/epayapi/services/thirdparty/common/single/custcardinfo`)
  const res = await axios.post(`${options.host}/epayapi/services/thirdparty/common/single/custcardinfo`, {
    ...signParams,
  }, {
    headers: {
      "Content-Type": 'application/x-www-form-urlencoded',
    },
  }).catch(e => {
    console.log(e)
  });
  return res.data;
}

/**
 * 通用卡、账户信息查询-批量查询
 * @param {String} params 查询参数
 *    - pageno       页码，默认1
 *    - pagesize     每页行数,默认10，范围10-500
 *    - cardupdtime  卡最后更新时间（二选一）
 *    - custupdtime  客户最后更新时间（二选一）
 * @param {Object} options 环境选项
 * @returns
 */
export const batchCardInfo = async (params, options = {}) => {
  options.host = options.host || process.env.EPAY_HOST;
  // 获得签名对象
  const signParams = getSignObject(params, options);
  debug(`${options.host}/epayapi/services/thirdparty/common/batch/custcardinfo`)
  const res = await axios.post(`${options.host}/epayapi/services/thirdparty/common/batch/custcardinfo`, {
    ...signParams,
  }, {
    headers: {
      "Content-Type": 'application/x-www-form-urlencoded',
    },
  }).catch(e => {
    console.log(e)
  });
  return res.data;
}

/**
 * 通用账户流水查询
 * @param {Object} params 查询参数
 *    - stuempno       查询对象的学号
 *    - pageno         页码，默认1
 *    - pagesize       每页行数,默认10，范围10-500
 *    - startdate      开始时间 格式yyyyMMdd 最多3个月前
 *    - enddate        结束日期 格式yyyyMMdd
 * @param {Object} options 环境选项
 * @returns
 */
export const getBillData = async (params, options = {}) => {
  options.host = options.host || process.env.EPAY_HOST;
  // 获得签名对象
  const signParams = getSignObject(params, options);
  debug(`${options.host}/epayapi/services/thirdparty/common/getbilldata`)
  const res = await axios.post(`${options.host}/epayapi/services/thirdparty/common/getbilldata`, {
    ...signParams,
  }, {
    headers: {
      "Content-Type": 'application/x-www-form-urlencoded',
    },
  }).catch(e => {
    console.log(e)
  });
  return res.data;
}

/**
 * 卡片挂失
 * @param {Object} params 参数
 *    - stuempno    挂失对象的学工号。与卡片物理ID必传一项
 *    - cardphyid   卡片物理ID，读卡得到。与学工号选其一即可，都传默认学工号为主
 * @param {Object} options 环境选项
 * @returns
 */
export const cardLoss = async (params, options = {}) => {
  options.host = options.host || process.env.EPAY_HOST;
  // 获得签名对象
  const signParams = getSignObject(params, options);
  debug(`${options.host}/epayapi/services/thirdparty/common/cardloss`)
  const res = await axios.post(`${options.host}/epayapi/services/thirdparty/common/cardloss`, {
    ...signParams,
  }, {
    headers: {
      "Content-Type": 'application/x-www-form-urlencoded',
    },
  }).catch(e => {
    console.log(e)
  });
  return res.data;
}

/**
 * 账户余额查询
 * @param {Object} params 参数
 *    - stuempno    挂失对象的学工号。与卡片物理ID必传一项
 *    - cardphyid   卡片物理ID，读卡得到。与学工号选其一即可，都传默认学工号为主
 * @param {Object} options 环境选项
 * @returns
 */
export const accountQuery = async (params, options = {}) => {
  options.host = options.host || process.env.EPAY_HOST;
  // 获得签名对象
  const signParams = getSignObject(params, options);
  debug(`${options.host}/epayapi/services/thirdparty/common/accountquery`)
  const res = await axios.post(`${options.host}/epayapi/services/thirdparty/common/accountquery`, {
    ...signParams,
  }, {
    headers: {
      "Content-Type": 'application/x-www-form-urlencoded',
    },
  }).catch(e => {
    console.log(e)
  });
  return res.data;
}

export default {
  singleCardInfo,
  batchCardInfo,
  getBillData,
  cardLoss,
  accountQuery,
};
