type PageHeaderProps = {
    pageTitle: string
    }

const PageHeader = ({pageTitle } : PageHeaderProps ) => {
  return (
    <div className="w-full pt-32 pb-4 bg-gray-200 my-profile-bg">
        <div className="container max-w-screen-xl mx-auto p-3">
          <h1 className="font-bold text-3xl">{pageTitle}</h1>
        </div>
      </div>
  )
}

export default PageHeader