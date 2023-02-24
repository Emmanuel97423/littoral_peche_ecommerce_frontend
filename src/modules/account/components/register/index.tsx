import { medusaClient } from "@lib/config"
import { LOGIN_VIEW, useAccount } from "@lib/context/account-context"
import Button from "@modules/common/components/button"
import Input from "@modules/common/components/input"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"

interface RegisterCredentials extends FieldValues {
  first_name: string
  last_name: string
  email: string
  password: string
  phone?: string
}

const Register = () => {
  const { loginView, refetchCustomer } = useAccount()
  const [_, setCurrentView] = loginView
  const [authError, setAuthError] = useState<string | undefined>(undefined)
  const router = useRouter()

  const handleError = (e: Error) => {
    setAuthError("An error occured. Please try again.")
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterCredentials>()

  const onSubmit = handleSubmit(async (credentials) => {
    medusaClient.customers
      .create(credentials)
      .then(() => {
        refetchCustomer()
        router.push("/account")
      })
      .catch(handleError)
  })

  return (
    <div className="max-w-sm flex flex-col items-center mt-12">
      <h1 className="text-large-semi uppercase mb-6">Devenez un membre Littoral Pêche</h1>
      <p className="text-center text-base-regular text-gray-700 mb-4">
        Créez votre profil de membre Littoral Pêche et accédez à une expérience d&apos;achat améliorée.
      </p>
      <form className="w-full flex flex-col" onSubmit={onSubmit}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="Prénom"
            {...register("first_name", { required: "Prénom requis" })}
            autoComplete="given-name"
            errors={errors}
          />
          <Input
            label="Nom"
            {...register("last_name", { required: "Nom requis" })}
            autoComplete="family-name"
            errors={errors}
          />
          <Input
            label="E-mail"
            {...register("email", { required: "E-mail requis" })}
            autoComplete="email"
            errors={errors}
          />
          <Input
            label="Tèl"
            {...register("phone")}
            autoComplete="tel"
            errors={errors}
          />
          <Input
            label="Mot de passe"
            {...register("password", {
              required: "Mot de passe requis",
            })}
            type="password"
            autoComplete="new-password"
            errors={errors}
          />
        </div>
        {authError && (
          <div>
            <span className="text-rose-500 w-full text-small-regular">
              Ces informations d&apos;identification ne correspondent pas à nos enregistrements
            </span>
          </div>
        )}
        <span className="text-center text-gray-700 text-small-regular mt-6">
          En créant un compte, vous acceptez la{" "}
          <Link href="/content/privacy-policy">
            <a className="underline">Politique de confidentialité</a>
          </Link>{" "}
          et les {" "}
          <Link href="/content/terms-of-use">
            <a className="underline">Conditions générales de vente</a>
          </Link>
          .
        </span>
        <Button className="mt-6">Créer un compte</Button>
      </form>
      <span className="text-center text-gray-700 text-small-regular mt-6">
        Déjà membre ?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline"
        >
          Se connecter
        </button>
        .
      </span>
    </div>
  )
}

export default Register
