import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/positions.dart';
import '../screens/invitation_screen.dart';

class PositionItem extends StatelessWidget {
  final String position;

  final String id;
  PositionItem(this.position, this.id);
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8),
      child: InkWell(
        onTap: () {
          // Navigator.of(context)
          //     .pushNamed(InvitationScreen.routeName, arguments: position);
          Navigator.of(context)
              .pushNamed('/after_positions_screen', arguments: position);
        },
        child: Card(
          child: Row(
            children: <Widget>[
              Expanded(
                child: Container(
                  constraints: const BoxConstraints(
                    maxHeight: double.infinity,
                  ),
                  child: Padding(
                    child: Text(position),
                    padding: EdgeInsets.only(bottom: 5, top: 5, left: 8),
                  ),
                ),
              ),
              IconButton(
                onPressed: () {
                  Provider.of<Positions>(context, listen: false)
                      .removePosition(id);
                },
                icon: Icon(Icons.delete),
                color: Colors.red,
              )
            ],
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
          ),
        ),
      ),
    );
  }
}
