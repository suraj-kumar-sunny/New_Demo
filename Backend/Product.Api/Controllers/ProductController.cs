using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Product.Api.Data;
using Product.Api.Models;

namespace Product.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController(AppDbContext context) : ControllerBase
    {
        private readonly AppDbContext _context = context;

        [HttpGet]
        public async Task<IActionResult> Products()
        {
            await Task.Delay(1000);
            return Ok(await _context.Products.AsNoTracking().ToListAsync());
        }
        [HttpPost]
        public async Task<IActionResult> CreateProduct(ProductModel model)
        {
            if(model is null){
                return BadRequest();
            }
            await _context.Products.AddAsync(model);
            await _context.SaveChangesAsync();
            return Ok(model);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if(product is null){
                return NotFound();
            }
            return Ok(product);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, ProductModel model)
        {
            if(id != model.Id){
                return BadRequest();
            }
            _context.Entry(model).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if(product is null){
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return Ok(product);
        }
    }
}