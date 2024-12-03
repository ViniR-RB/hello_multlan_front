import Cookies from "js-cookie";

class CookieService {
  /**
   * Define um cookie com nome, valor e tempo de expiração.
   * @param name Nome do cookie.
   * @param value Valor do cookie.
   * @param expiresInSeconds Tempo de expiração em segundos.
   */
  static setCookie(
    name: string,
    value: string,
    expiresInSeconds: number
  ): void {
    const expirationDate = new Date(
      new Date().getTime() + expiresInSeconds * 1000
    );
    Cookies.set(name, value, { expires: expirationDate });
  }

  /**
   * Obtém o valor de um cookie pelo nome.
   * @param name Nome do cookie.
   * @returns Valor do cookie ou undefined se não existir.
   */
  static getCookie(name: string): string | undefined {
    return Cookies.get(name);
  }

  /**
   * Remove um cookie pelo nome.
   * @param name Nome do cookie.
   */
  static deleteCookie(name: string): void {
    Cookies.remove(name);
  }
}

export default CookieService;
