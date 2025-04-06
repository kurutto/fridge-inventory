const HeaderFridgeAccount = ({fridgeName}:{fridgeName:string}) => {
  return (
    <div className="md:py-1.5 md:px-3 md:rounded-md md:bg-secondary max-lg:text-sm max-md:text-base max-md:text-white">
      {fridgeName}
    </div>
  );
};

export default HeaderFridgeAccount;
