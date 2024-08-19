using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace CRUDwithModalPopup.Models.DbEntities
{
    public class Product
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
    }
}
