// Function to create the SKU of a product
const getSKU = (modelSKU, color, storage, condition) => {
    const colorSKU = 
        {
            SpaceGray : "SG",
            RoseGold : "RG",
            Silver: "SL"
        }
    const conditionSKU = 
        {
            Good: "GOOD",
            VeryGood: "VGOOD",
            Excellent : "EXCL"
        }
    
    const updatedColor = color.replace(" ", "")
    const updatedCondition = condition.replace(" ", "")
    const updatedStorage = storage.replace("gb", "")

    const SKUColor = colorSKU[updatedColor]
    const SKUCondition = conditionSKU[updatedCondition]
    const SKUStorage = updatedStorage
    
    return modelSKU + "-" + SKUColor + "-" + SKUStorage + "-" + SKUCondition
}

module.exports = getSKU