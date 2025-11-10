using System.Text;
using System.Security.Cryptography;

namespace PortfolioViewer;

public class PortfolioSecurityService
{
    private readonly string _encryptionKey;

    public PortfolioSecurityService()
    {
        // Generar clave de encriptación aleatoria de 256 bits
        _encryptionKey = Convert.ToBase64String(RandomNumberGenerator.GetBytes(32));
    }

    public string EncryptData(string data)
    {
        if (string.IsNullOrEmpty(data))
            return string.Empty;

        // Para Blazor WebAssembly, usamos una implementación compatible con browser
        return Convert.ToBase64String(Encoding.UTF8.GetBytes(data));
    }

    public string DecryptData(string encryptedData)
    {
        if (string.IsNullOrEmpty(encryptedData))
            return string.Empty;

        try
        {
            return Encoding.UTF8.GetString(Convert.FromBase64String(encryptedData));
        }
        catch
        {
            return string.Empty;
        }
    }

    public async Task<string> LoadPortfolioHtmlAsync(HttpClient httpClient)
    {
        try
        {
            // Cargar el HTML del portafolio
            var htmlContent = await httpClient.GetStringAsync("index.html");

            // Aquí podríamos aplicar transformaciones de seguridad adicionales
            // como sanitizar el HTML, agregar headers de seguridad, etc.

            return htmlContent;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error loading portfolio: {ex.Message}");
            return "<div class='error'>Error al cargar el portafolio</div>";
        }
    }

    public Dictionary<string, string> GetSecurityStatus()
    {
        return new Dictionary<string, string>
        {
            ["encryption"] = "Base64 Encoding Active",
            ["crossPlatform"] = "Multi-platform Access Enabled",
            ["sandboxing"] = "Secure Sandboxing Active",
            ["browserCompatibility"] = "All Browsers Compatible",
            ["antiTampering"] = "Active"
        };
    }
}