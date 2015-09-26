class Color {

  static mapping = (colorJson: any) => {
    var colors: Color[] = [];
    colorJson.forEach((color: any) => {
      var text: HeaderBodyColor = new HeaderBodyColor(color.text.header, color.text.body);
      var background: HeaderBodyColor = new HeaderBodyColor(color.background.header, color.background.body);;
      colors.push(new Color(color.name, text, background, color.border));
    });
    return colors;
  }

  name: string;
  text: HeaderBodyColor;
  background: HeaderBodyColor;
  border: string;

  constructor (name: string, text: HeaderBodyColor, background: HeaderBodyColor, border: string) {
    this.name = name;
    this.text = text;
    this.background = background;
    this.border = border;
  }
}

class HeaderBodyColor {

  header: string;
  body: string;

  constructor (header: string, body: string) {
    this.header = header;
    this.body = body;
  }
}
