/* eslint-disable no-undef */
import process from 'node:process';
import assert from 'assert';
import {Epay} from '../src/index.js';

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

const { EPAY_HOST, EPAY_PUBLIC_KEY, EPAY_PARTNER_ID } = process.env;

assert.ok(EPAY_HOST);
assert.ok(EPAY_PUBLIC_KEY)
assert.ok(EPAY_PARTNER_ID)

// @ts-ignore
describe('一卡通', function() {
  it('通用卡、账户信息查询-单用户接口', async () => {
    const res = await Epay.singleCardInfo("",{ EPAY_HOST, EPAY_PUBLIC_KEY, EPAY_PARTNER_ID });
    assert.equal(res.retcode, 0);
  });

  it('通用卡、账户信息查询-批量接口', async () => {
    const params = {
      cardupdtime: "20240423145802",
    }
    const res = await Epay.batchCardInfo(params,{ EPAY_HOST, EPAY_PUBLIC_KEY, EPAY_PARTNER_ID });
    assert.equal(res.retcode, 0);
  });

  // todo 待测试，目前测试结果为 系统错误
  it('通用账户流水查询', async () => {
    const params = {
      stuempno: "",
      startdate: "20240225",
      enddate: "20240425",
      pageno: "1",
      pagesize: "30",
    }
    const res = await Epay.getBillData(params,{ EPAY_HOST, EPAY_PUBLIC_KEY, EPAY_PARTNER_ID });
    assert.equal(res.retcode, 0);
  });
  // todo 待测试
  it('卡片挂失', async () => {
    const params = {
      stuempno: "",
      cardphyid: "",
    }
    const res = await Epay.cardLoss(params,{ EPAY_HOST, EPAY_PUBLIC_KEY, EPAY_PARTNER_ID });
    assert.equal(res.retcode, 0);
  });

  it('账户余额查询', async () => {
    const params = {
      stuempno: "",
      cardphyid: "",
    }
    const res = await Epay.accountQuery(params,{ EPAY_HOST, EPAY_PUBLIC_KEY, EPAY_PARTNER_ID });
    assert.equal(res.retcode, 0);
  });
});