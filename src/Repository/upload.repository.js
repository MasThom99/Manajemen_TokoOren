import ImageKit from "imagekit";
import fs from "fs";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGAEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndPoint: process.env.IMAGEKIT_URL,
});

class UploadRepository {
  async uploadFoto(req, res) {
    const file = req.file;
    console.log(file);
    imagekit.upload(
      {
        file: fs.readFileSync(file.path),
        fileName: file.originalname,
        useUniqueFileName: false,
      },
      (error, result) => {
        if (error) {
          console.log(error);
          return res.status(500).send(error.message);
        }
        fs.unlinkSync(file.path);
        return res.status(200).json({
          status: true,
          message: "upload file successfully",
          data: result.url,
        });
      }
    );
  }
}

export default UploadRepository;
