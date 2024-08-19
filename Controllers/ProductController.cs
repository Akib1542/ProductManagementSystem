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

        [HttpGet]
        public JsonResult Edit(int id)
        {
            var product = _context.Products.Find(id);
            return Json(product);
        }

        [HttpPost]
        public JsonResult Update(Product product)
        {
            if (ModelState.IsValid)
            {
                _context.Products.Update(product);
                _context.SaveChanges();
                return Json("Products Updated Successfully!");            
            }
            return Json("Model validation failed!");
        }

        [HttpPost]
        public JsonResult Delete(int id)
        {
            var product = _context.Products.Find(id);
            if (product != null)
            {
                _context.Remove(product);
                _context.SaveChanges();
                return Json("Product Deleted Successfully!");
            }
            return Json($"Product Not Found id : {id}");
        }
    }
}

