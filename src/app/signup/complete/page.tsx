import Box from "@/components/ui/box";
import Heading from "@/components/ui/heading";
import Paragraph from "@/components/ui/paragraph";

const SignupComplate = () => {
  return (
    <Box variant="roundedMaxMd" className="md:w-lg mx-auto">
      <Heading level={2} className="justify-center">登録が完了しました</Heading>
      <Paragraph className="md:text-center">
        ご登録いただきありがとうございます。
        <br />
        メールアドレスの確認メールをお送りしましたので、メール内のリンクをクリックしてアカウントを有効化してください。
        <br />
        メールが届かない場合は、迷惑メールフォルダをご確認いただくか、もう一度確認メールを送信してください。
      </Paragraph>
    </Box>
  );
};
export default SignupComplate;
