const { S3Client, HeadBucketCommand, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

// Connecting to AWS S3
const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY
    },
    region: process.env.AWS_S3_REGION
});

const s3Connect = async (file) => {
    let url =''
    const bucketName = process.env.AWS_S3_BUCKET_NAME
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




