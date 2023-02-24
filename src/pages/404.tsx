import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import Link from "next/link"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"

const NotFound: NextPageWithLayout = () => {
  return (
    <>
      <Head title="404" description="Something went wrong" />
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
        <h1 className="text-2xl-semi text-gry-900">Bredouille!</h1>
        <p className="text-small-regular text-gray-700">
          La page à laquelle vous avez essayé d&apos;accéder n&apos;existe pas.
        </p>
        <Link href="/">
          <a className="mt-4 underline text-base-regular text-gray-900">
            Allez à la boutique
          </a>
        </Link>
      </div>
    </>
  )
}

NotFound.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default NotFound
