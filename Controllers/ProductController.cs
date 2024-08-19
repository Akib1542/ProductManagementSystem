using CRUDwithModalPopup.DAL;
using CRUDwithModalPopup.Models.DbEntities;
using Microsoft.AspNetCore.Mvc;

namespace CRUDwithModalPopup.Controllers
{
    public class ProductController : Controller
    {
       private readonly MyDbContext _context;

        public ProductController(MyDbContext context)
        {
            _context = context;
        }


        public IActionResult Index()
        {
            return View();
        }


        // create no view
        public JsonResult GetProducts()
        {
            var products = _context.Products.ToList();
            return Json(products);
        }

        public JsonResult Insert(Product model)
        {
            if(ModelState.IsValid)
            {
                _context.Products.Add(model);
                _context.SaveChanges();
                return Json("product details saved!");
            }
            else
            {
                return Json("model validation failed!");
            }
        }
    }
}
