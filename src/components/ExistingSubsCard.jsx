import ButtonSmall from "./ButtonSmall";

function ExistingSubsCard({ service, categories }) {
  const { logo_url, service_name, category_id } = service;

  return (
    <div className="flex items-center justify-between py-4 border-b">
      <div className="flex items-center w-full">
        <img
          className="rounded-full drop-shadow"
          src={logo_url}
          alt={service_name}
        />
        <div className="pl-3">
          <h2 className="text-base">{service_name}</h2>
          <p className="text-sm text-medium-grey">
            {categories[category_id] || "Unknown"}
          </p>
        </div>
      </div>

      <div>
        <ButtonSmall content={"+ Add"} type={"secondary"} />
      </div>
    </div>
  );
}

export default ExistingSubsCard;
