string containerWebRoot = System.Environment.GetEnvironmentVariable("WEBROOT_PATH");
string fallbackWebRoot = System.IO.Path.Combine(System.IO.Directory.GetCurrentDirectory(), "wwwroot");
string webRootPath = !string.IsNullOrEmpty(containerWebRoot) && System.IO.Directory.Exists(containerWebRoot)
    ? containerWebRoot
    : fallbackWebRoot;

Microsoft.AspNetCore.Builder.WebApplicationBuilder builder =
    Microsoft.AspNetCore.Builder.WebApplication.CreateBuilder(new Microsoft.AspNetCore.Builder.WebApplicationOptions
    {
        WebRootPath = webRootPath,
        Args = args
    });

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

Microsoft.AspNetCore.Builder.WebApplication app = builder.Build();

if (!System.IO.Directory.Exists(app.Environment.WebRootPath))
{
    app.Logger.LogWarning("WebRootPath not found: {WebRootPath}. Static files may not be served.", app.Environment.WebRootPath);
}

app.UseDefaultFiles();
app.UseStaticFiles();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.MapFallbackToFile("/index.html");

app.Run();
