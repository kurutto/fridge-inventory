import Box from "../ui/box";
import Button from "../ui/button";
import Heading from "../ui/heading";
import Input from "../ui/input";
import Label from "../ui/label";
import Select from "../ui/select";

const AddListForm = () => {
  return (
    <>
      <Heading level={2} className="justify-center">買物リスト追加</Heading>
      <Box variant="spaceY">
        <Box variant="horizontally">
          <Label className="w-12">品名<span className="text-destructive">*</span></Label>
          <Input type="text" className="md:flex-1 max-md:w-full" />
        </Box>
        <Box variant="horizontally">
          <Label className="w-12">数量</Label>
          <div>
            <Input type="text" className="w-20" />
            <Select options={["個", "g", "ml"]} className="ml-2" />
          </div>
        </Box>
      </Box>
      <Button color="primary" className="block mx-auto w-45">送信</Button>
    </>
  );
};

export default AddListForm;
