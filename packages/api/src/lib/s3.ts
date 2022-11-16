import { S3 } from "aws-sdk/clients/all"

import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } from "./config"

// AWS
export const s3 = new S3({
  signatureVersion: "v4",
  region: "eu-west-2",
  credentials: { accessKeyId: AWS_ACCESS_KEY_ID, secretAccessKey: AWS_SECRET_ACCESS_KEY },
})
