import { useAccount } from "@lib/context/account-context"
import AddressBook from "../components/address-book"

const AddressesTemplate = () => {
  const { customer, retrievingCustomer } = useAccount()

  if (retrievingCustomer || !customer) {
    return null
  }

  return (
    <div className="w-full">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Adresse de livraison</h1>
        <p className="text-base-regular">
          Affichez et mettez à jour vos adresses de livraison, vous pouvez en ajouter autant que vous le souhaitez. L&apos;enregistrement de vos adresses les rendra disponibles lors du paiement.
        </p>
      </div>
      <AddressBook customer={customer} />
    </div>
  )
}

export default AddressesTemplate
