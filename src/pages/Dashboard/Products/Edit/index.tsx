import CreateUpdateProductForm from 'components/product/CreateUpdateProductForm/CreateUpdateProductForm'
import DashboardLayout from 'components/ui/DashboardLayout'
import { FC } from 'react'
import { useLocation } from 'react-router-dom'

const DashboardProductsEdit: FC = () => {
  const location = useLocation()
  return (
    <DashboardLayout>
      <h1 className="mb-3 text-center">Edit Product</h1>
      <CreateUpdateProductForm defaultValues={location.state} />
    </DashboardLayout>
  )
}

export default DashboardProductsEdit
