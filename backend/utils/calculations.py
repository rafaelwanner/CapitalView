def fraction(total, portion):
    if total == 0:
        return 0

    fraction = round(( portion / total ) * 100, 2)
    return fraction


def gain_percent(current_price, price):
    gain_percent = ((current_price * 100.0) / price) - 100.0
    return round(gain_percent, 2)
