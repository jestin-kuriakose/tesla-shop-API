const { S3Client, HeadBucketCommand, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

// Connecting to AWS S3
const s3 = new S3Client({
    credentials: {
        accessKeyId: "AKIAUUGT2KHQHSCLZCOJ",
        secretAccessKey: "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"
    },
    region: "ap-northeast-1"
});

const s3Connect = async (file) => {
    let url =''
    const bucketName = 'tesla-shop'
    const params = {
        Bucket: bucketName,
        Key: 'output1.pdf',
        Body: file,
        ContentType: 'application/pdf'
    }

    try {
        const command = new PutObjectCommand(params)
        await s3.send(command)
        //Getting a signed URL from S3 to add to the database. Inserted url to 'image' key in database
        const getObjectParams = {
            Bucket: bucketName,
            Key: 'output1.pdf'
        }
        const getUrlCommand = new GetObjectCommand(getObjectParams);
        url = await getSignedUrl(s3, getUrlCommand, { expiresIn: 3600 });
        console.log(url)
        return url
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = s3Connect




