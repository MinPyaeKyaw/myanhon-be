import { type Request, type Response } from 'express'

import { PrismaClient } from '@prisma/client'
import NodeRSA from 'node-rsa'
import axios from 'axios'

import {
  encryptPaymentPayload,
  logError,
  writeJsonRes,
} from '../../utils/functions'

const prisma: PrismaClient = new PrismaClient()

export const pay = async (req: Request, res: Response) => {
  try {
    const paymentPayload = {
      providerName: req.body.providerName,
      methodName: req.body.methodName,
      totalAmount: req.body.totalAmount,
      orderId: req.body.orderId,
      customerPhone: req.body.customerPhone,
      customerName: req.body.customerName,
      items: JSON.stringify(req.body.items),
    }

    const data = encryptPaymentPayload(paymentPayload)

    const token = await axios.get(
      'https://staging.dinger.asia/payment-gateway-uat/api/token?projectName=sannkyi staging&apiKey=m7v9vlk.eaOE1x3k9FnSH-Wm6QtdM1xxcEs&merchantName=mtktest',
    )

    const payload = new FormData()
    if (data) {
      payload.append('payload', data)
    }

    const status = await axios.post(
      'https://staging.dinger.asia/payment-gateway-uat/api/pay',
      payload,
      {
        headers: {
          Authorization: `Bearer ${token.data.response.paymentToken}`,
        },
      },
    )

    return writeJsonRes<any>(res, 200, status.data, 'test payment!')
  } catch (error) {
    logError(error, 'Payment Controller')
    return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
  }
}
