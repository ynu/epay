import CryptoJS from 'crypto-js';
import moment from 'moment';
import process from 'node:process';

/**
 * 获得签名后的对象
 * @param {Object} params 参数对象
 * @param {Object} options 其它参数
 * @returns
 */
export function getSignObject(params, options) {
  // 获得公钥
  const public_key = options.public_key || process.env.EPAY_PUBLIC_KEY;
  // 获得合作伙伴ID号
  params.partner_id = options.partner_id || process.env.EPAY_PARTNER_ID;
  // 时间戳格式化YYYYMMDDHHmmss
  params.timestamp = moment().format('YYYYMMDDHHmmss');
  // 加密方法 默认HAMC
  params.sign_method = 'HMAC'
  // 获取参数的键数组，并排序
  const sortedKeys = Object.keys(params).sort();
  let encodedPairs = []
  // 创建URL编码的键值对字符串数组
  sortedKeys.map(key => {
    const encodedKey = encodeURIComponent(key);
    const encodedValue = encodeURIComponent(params[key]);
    // 排除空的签名字段，否则签名校验无法通过
    if (encodedValue !== '' && encodedValue !== null && encodedValue !== undefined) {
      encodedPairs.push(`${encodedKey}=${encodedValue}`)
    }
  });
  // 用&符号连接编码后的字符串
  const paramsStr = encodedPairs.join("&");
  // 获得签名, 加密方式为HAMC-SHA1
  params.sign = CryptoJS.HmacSHA1(paramsStr, public_key).toString();
  // 返回新的参数对象
  return params
}
