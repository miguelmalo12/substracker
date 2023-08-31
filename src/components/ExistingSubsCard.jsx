import ButtonSmall from "./ButtonSmall";

function ExistingSubsCard({ service, categories, onClick }) {
  const { logo_url, service_name, category_id } = service;

  return (
    <div className="flex items-center justify-between w-full py-4 border-b dark:border-medium-grey md:max-w-xs">
      <div className="flex items-center flex-grow">
        <img
          className="rounded-full drop-shadow"
          src={logo_url}
          alt={service_name}
        />
        <div className="flex-grow pl-3">
          <h2 className="text-base">{service_name}</h2>
          <p className="text-sm text-medium-grey">
            {categories[category_id] || "Unknown"}
          </p>
        </div>
      </div>

      <div>
        <ButtonSmall content={"+ Add"} type={"secondary"} onClick={onClick} />
      </div>
    </div>
  );
}

export default ExistingSubsCard;
