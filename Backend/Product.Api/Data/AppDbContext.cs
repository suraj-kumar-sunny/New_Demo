using Microsoft.EntityFrameworkCore;
using Product.Api.Models;

namespace Product.Api.Data
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<ProductModel> Products { get; set; }
    }
}