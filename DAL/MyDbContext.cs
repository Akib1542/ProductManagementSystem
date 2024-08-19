using CRUDwithModalPopup.Models.DbEntities;
using Microsoft.EntityFrameworkCore;

namespace CRUDwithModalPopup.DAL
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions options) : base(options)
        {
        }

        public virtual DbSet<Product> Products { get; set; }
    }
}
