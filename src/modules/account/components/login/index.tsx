import { medusaClient } from "@lib/config"
import { LOGIN_VIEW, useAccount } from "@lib/context/account-context"
import Button from "@modules/common/components/button"
import Input from "@modules/common/components/input"
import { useRouter } from "next/router"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"

interface SignInCredentials extends FieldValues {
  email: string
  password: string
}

const Login = () => {
  const { loginView, refetchCustomer } = useAccount()
  const [_, setCurrentView] = loginView
  const [authError, setAuthError] = useState<string | undefined>(undefined)
  const router = useRouter()

  const handleError = (_e: Error) => {
    setAuthError("Invalid email or password")
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInCredentials>()

  const onSubmit = handleSubmit(async (credentials) => {
    medusaClient.auth
      .authenticate(credentials)
      .then(() => {
        refetchCustomer()
        router.push("/account")
      })
      .catch(handleError)
  })

  return (
    <div className="max-w-sm w-full flex flex-col items-center">
      <h1 className="text-large-semi uppercase mb-6">Content de vous revoir</h1>
      <p className="text-center text-base-regular text-gray-700 mb-8">
        Connectez-vous pour accéder à une expérience d&apos;achat améliorée.
      </p>
      <form className="w-full" onSubmit={onSubmit}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="E-mail"
            {...register("email", { required: "E-mail requis" })}
            autoComplete="email"
            errors={errors}
          />
          <Input
            label="Mot de passe"
            {...register("password", { required: "Mot de passe requis" })}
            type="password"
            autoComplete="current-password"
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
        <Button className="mt-6">Se connecter</Button>
      </form>
      <span className="text-center text-gray-700 text-small-regular mt-6">
        Pas encore membre ?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="underline"
        >
          Rejoignez nous
        </button>
        .
      </span>
    </div>
  )
}

export default Login
