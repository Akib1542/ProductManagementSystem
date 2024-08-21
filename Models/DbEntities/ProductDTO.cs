using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace CRUDwithModalPopup.Models.DbEntities
{
    public class ProductDTO
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [DisplayName("Product sName")]
        public string ProductName { get; set; }
        [Required]
        public double Price { get; set; }
        [Required]
        public int Quantity { get; set; }

        public int SerialNumber { get; set; }
    }
}
