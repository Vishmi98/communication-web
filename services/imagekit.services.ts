import ImageKit from "imagekit";

export const imageKit = new ImageKit({
  publicKey: "public_in+0H9iSr1dd02haxfe0dZoaFgU="!,
  privateKey: "private_WvFsasYM1QtdioJmvLqwrXu5em4="!,
  urlEndpoint: "https://ik.imagekit.io/8btgrkpmp"!,
});

export class ImageKitService {
  static async uploadImage(file: Buffer, fileName: string, folder: string) {
    console.log("filename", fileName);
    try {
      return await imageKit.upload({
        file,
        fileName,
        folder: `/${folder}`,
      });
    } catch (error) {
      console.log("error", error);

      return { url: "", fileId: "" }
    }
  };

  static async deleteImage(fileId: string) {
    return await imageKit.deleteFile(fileId);
  };
}
